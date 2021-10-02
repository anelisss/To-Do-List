//importam linkul de la vuejs CDN (for prototyping/learning purposes)
//se adauga type="module" in script in fisierul html
import "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"

import { TodoList, Task } from "./classes.js"

Vue.component('task', {
    // proprietati ale acestei componente "task" care "vin din afara"; si avem taskObject
    props: ['task'],
    data() {
        return {
            editable: false,
            newTaskDescription: this.task.getDescription()
        }
    },
    template: `
    <!-- am pus id-uri pt stilizarea de apoi -->
    <!-- am pus clasa done si functia pe care o va avea pt stilizare in css ca sa taiem un task cand dam click pe el -->
    <li class="task" :class="{ done: task.isDone() }">
    <input id="editInput" v-if="editable" type="text" v-model="newTaskDescription" @keyup.enter="rename">


        <span v-else class="desc" @click="switchDone"> {{ task.getDescription() }} </span>
        
        <span class="edit" @click="edit"> ✎ </span>

        <span class="remove" @click="remove"> 🗑 </span>
    </li>
    `,

    methods: {
        switchDone() {
            this.task.switchDone()
        },
        remove() {
            this.$emit('removed')
        },
        edit() {
            this.editable = true
        },
        rename() {
            this.task.changeDescription(this.newTaskDescription)
            this.editable = false
        }
    },
})

Vue.component('todo-list', {
    data() {
        return {
            list: new TodoList("Today's to do list"), //componenta noastra va lucra cu aceasta lista (obiect)
            newTaskDescription: ''
        }
    },

    template: `
    <div>
        <!-- din lista componentei, luam getter-ul pt nume din clasa Task -->
        <h2>{{ list.getName() }}</h2>
        <ul>
            <!-- avem nevoie de index ca sa si stergem taskurile -->
            <!-- pt fiecare task din lista de Tasks, o sa randam o componenta de task -->
            <task v-for="(task, index) in list.getTasks()"
                :key="index"
                :task="task"
                @removed="remove(index)"
            ></task>
        </ul>

        <!-- descr. task-ului -->
        <input
            onfocus="this.value=''"
            class="input"
            type="text"
            v-model="newTaskDescription" 
            placeholder="type something..."
            @keyup.enter="addTask"
        >
    </div>
    `,

    methods: {
        addTask() {
            this.list.add(new Task(this.newTaskDescription))
        },
        // event pe task in ul mai sus
        remove(index) {
            this.list.remove(index)
        }
    },
})


new Vue({
    el: "#app",
    template: `
    <todo-list></todo-list>
    `
})