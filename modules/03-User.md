---
layout: section
title: User
anchor: user
group: 'modules'
---

The `User` module takes care of everything related to users.

### Architecture

* `UserManager` holds the `User`s
* `UserService` hold the entity
* `User` the entity

### Setup

No setup required.

### Get the current session's user

```php
$user = $userManager->getUserFromRequest();
if(!$user){
	echo "not logged in";
} else {
	echo "hello ".$user->getUsername();
}
```

### Create a User

```php
$user = $userManager->createUser(array(
	'usename'  => 'Richard Stallman',
	'password' => 'foaijwf293foa0wf23',
	//..
));
$userManager->getObjectManager()->flush();
```

### Find a User

```php
// by user id
$user = $userManager->getUser(1);

// by username
$user = $userManager->findUserByUsername('foobar');

// by email
$user = $userManager->findUserByUsername('foo@bar.de');
```

#### By user Id

```php
$user = $userManager->getUser(1);
```

#### By username

```php
$user = $userManager->findUserByUsername('foobar');
```

#### By email

```php
$user = $userManager->findUserByUsername('foo@bar.de');
```
