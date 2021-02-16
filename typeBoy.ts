interface Person {
    firstName: string;
    lastName: string;
}

function hello(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Dobby", lastName: "Hot" };

document.body.textContent = hello(user);