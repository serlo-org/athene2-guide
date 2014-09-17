---
layout: section
title: User
anchor: user
group: 'modules'
---

// Das Usermodul ist zuständig für alles, was den User betrifft.
The User module takes care of everything related to users.

// ### Architektur
### Architecture

* `UserManager` holds the Users
* `UserService` hold the Entity
* `User` the Entity

### Setup

// Es ist kein Setup nötig!
No setup required.

// ### Den Benutzer der Session holen
### Getting the current Session's User

```php
$user = $userManager->getUserFromRequest();
if(!$user){
	echo "not logged in";
} else {
	echo "hello ".$user->getUsername();
}
```

// ### Einen Benutzer erstellen
### Creating a User

```php
$user = $userManager->createUser(array(
	'usename'  => 'Richard Stallman',
	'password' => 'foaijwf293foa0wf23',
	//..
));
$userManager->getObjectManager()->flush();
```

// ### Einen Benutzer holen
### Finding a User

```php
// by user id
$user = $userManager->getUser(1);

// by username
$user = $userManager->findUserByUsername('foobar');

// by email
$user = $userManager->findUserByUsername('foo@bar.de');
```

// #### Über die UserId
// #### by user Id

// ```php
// $user = $userManager->getUser(1);
// ```

// #### Über den Usernamen
// #### by username

// ```php
// $user = $userManager->findUserByUsername('foobar');
// ```

// #### Über die Email
// #### by email

// ```php
// $user = $userManager->findUserByUsername('foo@bar.de');
// ```