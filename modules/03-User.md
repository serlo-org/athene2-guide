---
layout: section
title: User
anchor: user
group: 'modules'
---

Das Usermodul ist zuständig für alles, was den User betrifft.

### Architektur

* `UserManager` hält die User
* `UserService` hält das Entity
* `User` das Entity

### Setup

Es ist kein Setup nötig!

### Den Benutzer der Session holen

```php
$user = $userManager->getUserFromRequest();
if(!$user){
	echo "nicht eingeloggt";
} else {
	echo "hallo ".$user->getUsername();
}
```

### Einen Benutzer erstellen

```php
$user = $userManager->createUser(array(
	'usename' => 'Horst',
	'password' => 'foaijwf293foa0wf23',
	//..
));
$userManager->getObjectManager()->flush();
```

### Einen Benutzer holen

#### Über die UserId

```php
$user = $userManager->getUser(1);
```

#### Über den Usernamen

```php
$user = $userManager->findUserByUsername('foobar');
```

#### Über die Email

```php
$user = $userManager->findUserByUsername('foo@bar.de');
```