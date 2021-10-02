function random(max) {
    return Math.floor(Math.random() * max - 1) //functie generala care genereza un nr random intre 0 si max
}

class Color {
    red
    green
    blue

    constructor(red, green, blue) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    //The static methods are called via the class name, not the instances of the class. ... staticMethodName() to call a static method in a class constructor or an instance method.
    static random() {
        return new Color(random(255), random(255), random(255)) //genereaza 3 culori random pt proprietatile constructorului Color: red, green, blue
    }
}

class Task {
    description
    color = Color.random() //ne da o culoare aleatorie
    done = false // nu sunt finalizate, initial

    constructor(description) {
        this.description = description
        //anumite proprietati pot fi definite in constructor sau direct in clasa.e acelasi lucru
    }

    //pentru metoda done putem sa facem un switch, ca sa fie done si undo

    switchDone() {
        this.done = !this.done // schimba starea taskului, dar nu returneaza nimic
    }

    isDone() {
        return this.done //daca e done, o sa returneze true, altfel false.
    }

    //pentru a schimba descrierea, vom atribui un param. newDesc. care va fi valoarea descrierii initiale
    changeDescription(newDescription) {

        if(newDescription.length > 100) {
            throw 'Description is too long'
        }

        this.description = newDescription
    }

    //avem o metoda getter pentru a o folosi, in loc sa accesam proprietatea cu this pt protejarea informatiei.
    getDescription() {
        return this.description
    }
}

class TodoList {
    name
    tasks = [] //array gol pt tasks

    //mereu cand cream o lista, avem nevoie si de nume
    constructor(name) {
        this.name = name
    }

    //schimbare de nume a taskului
    rename(newName) {
        this.name = newName
    }

    //in lista de tasks, adaugam un task
    add(task) {
        this.tasks.push(task)
    }

    //pentru a sterse un task din tasks, folosim splice cu 2 parametri, index si cate taskuri vrem sa stergem
    remove(index) {
        this.tasks.splice(index, 1)
    }

    //avem nevoie de 2 getteri (nume si tasks) pentru incapsulare (protejarea informatiei)
    //pt ca sunt querry-uri, folosim return
    getName() {
        return this.name
    }

    getTasks() {
        return this.tasks
    }
}

//putem pune export in fata clasei pe care vrem sa o exportam
export { TodoList, Task }

//exemplu de creare task (fara interfata)

// let today = new TodoList('Today')
// today.add(new Task('Say good morning')) // index 0
// today.add(new Task('Learn OOP')) // index 1
// today.remove(1)