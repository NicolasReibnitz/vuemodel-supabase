# About fork

[NicolasReibnitz/vuemodel-supabase](https://github.com/NicolasReibnitz/vuemodel-supabase)

I updated Luke's fine [@vuemodel/supabase](https://github.com/vuemodel/supabase) package to work with [@supabase/supabase-js](https://github.com/supabase/supabase-js) ^2.13.1.

## Installation

```bash
# npm
npm install 'git@github.com:NicolasReibnitz/vuemodel-supabase.git'

# or yarn
yarn add 'git@github.com:NicolasReibnitz/vuemodel-supabase.git'
```

Import it just like the original package as `@vuemodel/supabase`.

Or even better, use the [Quasar App Extension @vuemodel/supabase](https://github.com/vuemodel/quasar-app-extension-supabase).

## Important

You will also need the fork of Luke's [@vueauth/supabase](https://github.com/vueauth/vueauth) package for supabase v2.

You can find that here: [NicolasReibnitz/vueauth](https://github.com/NicolasReibnitz/vueauth/tree/main/supabase).

## Breaking changes

#### Changes to the API

`useModel`, `useModelCollection` and `useModelAPI` now require the user ID to be passed in as the second argument. This is because the synchronous `supabase.auth.user()` is no longer available in the new version of the Supabase client. The new `supabase.auth.getUser()` is asynchronous, so the user ID must be passed in manually for this to work well with the Vue composition API and `<script setup />`.

Here is an example of how to use this with [VueAuth](https://www.vueauth.com/):

```js
import { useAuthState } from '@vueauth/core';
import { useModel, useModelCollection, useModelAPI } from '@vuemodel/supabase/src/main';

const authState = useAuthState();
const userID = authState?.user?.value?.id;

const service = useModel(model, userID);
const serviceCollection = useModelCollection(model, userID);
const serviceAPI = useModelAPI(model, userID);
```

#### Other internal changes

-   `ApiError` was renamed to `AuthError`

#### Cheers!

Nicolas

---

# A Quick Note...

Currently, this package is a bit of an experiment! If you'd like to use these concepts in production that's okay, yet I'd recommend forking this repo and making it your own. At least until these concepts standardize.

Enough preamble. Let's dive in! 🤿

## Installation

```js
import { SupabasePlugin } from '@vuemodel/supabase';

Vue.install(SupabasePlugin, {
	credentials: {
		supabaseUrl: 'your-supabase-url',
		supabaseKey: 'your-supabase-key'
	}
});
```

## Usage

### useModel

```js
import { useModel } from '@vuemodel/supabase'

export default class Todo extends Model {
  static entity = 'todos'

  static fields () {
    return {
      id: this.uid(),
      title: this.string(''),
      done: this.boolean(false),
    }
  }
}

const todoService = useModel(Todo)

/**
 * 🤿 When finding, upating, or deleting a model
 * You first need to set the id
 */
todoService.id.value = 7
todoService.find()
todoService.remove()

/**
 * 🤿 When creating/updating a new model, the form is
 * already generated for you!
 */

// Creating
todoService.form.value {
  title: 'buy shoes',
  done: false
}
todoService.create()

// Updating
todoService.form.value {
  done: true
}
todoService.update()

/**
 * Of course, we have access to the model
 */
todoService.id.value = 7
console.log(todoService.model.value)

/**
 * Need to reset the form? Gotcha covered!
 */
todoService.resetForm()

/**
 * You don't even have to deal with errors!
 */
todoService.form.value {
  done: 'this should be a boolean 😱'
}
await todoService.update()
console.log(todoService.error.value)

/**
 * We have access to all of the models
 * possible loading states...
 */
todoService.creating.value
todoService.finding.value
todoService.updating.value
todoService.removing.value
todoService.loading.value
```

### useModelCollection

useModelCollection hasn't been fleshed out yet! More to come :)

```js
import { useModelCollection } from '@vuemodel/supabase';

export default class Todo extends Model {
	static entity = 'todos';

	static fields() {
		return {
			id: this.uid(),
			title: this.string(''),
			done: this.boolean(false)
		};
	}
}

const todoCollectionService = useModel(Todo);

/**
 * 🤿 Let's go get some models from the backend!
 */
todoCollectionService.index();

/**
 * 🤿 Filter models by ids
 */
todoCollectionService.ids.value = [1, 3, 5];

/**
 * 🤿 Of course, you'll want access to the collection...
 */
todoCollectionService.collection.value;

/**
 * 🤿 Want to add in a loading spinner?
 */
todoCollectionService.indexing.value;

/**
 * 🤿 And finally, let's take a look at error handling
 */
await todoCollectionService.index();
console.log(todoCollectionService.error.value);
```

## Destructuring

Note that in the real world, you'll probably want to use destructuring. For example:

```vue
<script setup>
	const { form, create, creating, error } = useModel(Todo);
</script>

<template>
	<input v-model="form.title" />

	<button :disabled="creating" @click="create">create</button>

	<span v-if="creating">creating...</span>
	<span v-if="error">{{ error.message }}</span>
</template>
```

## Coming Soon!

I'll likely add:

-   Scoping
-   Filtering
-   Batch operations As the Supabase API makes this possible! So stay tuned for that 😄
