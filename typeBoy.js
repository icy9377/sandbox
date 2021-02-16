function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
document.body.textContent = greeter({ firstName: "Dobby", lastName: "Hot" });
