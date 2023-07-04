# What is TODO-CLI

TODO-CLI is a command line interface todo app built with NodeJS and SQLite.

## installation

- clone project with `git clone https://github.com/7odadocoding/todoCli.git`
- after navigating to the project root folder
- run `npm install` to install all dependencies.
- run `npm link` to access the `todo` command anywhere on your pc.
- run `npm run migrate` to create the database tables required.

## Usage

The following commands are available for managing your todos:

### Create a new todo

`todo new --title=[title] [--desc=[description]]`

**[title] (required)**: The title of the todo.

**[description] (optional)**: The description of the todo.

### Get todos

`todo get [--filter=[filter]] [--id=[id]]`

**[filter] (optional)**: The filter to apply. Possible values: `'all'`, `'done'`, `'undone'`. Default: `'all'`.

**[id] (optional)**: The ID of a specific todo to retrieve.

### Mark todo as done

`todo done --id=[id]`

**[id] (required)**: The ID of the todo to mark as done.

### Mark todo as undone

`todo undone --id=[id]`

**[id] (required)**: The ID of the todo to mark as undone.

### Delete a todo

`todo delete --id=[id]`

**[id] (required)**: The ID of the todo to delete.
