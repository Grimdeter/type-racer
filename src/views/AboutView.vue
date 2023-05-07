<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselObjects = [
  {
    text: 'The base of the entire project is Vue3 with CompositionAPI. Firstly, Vue3 with Composition API introduces several optimizations to improve the performance of applications. For instance, Vue3 has a faster virtual DOM, in part due to the new reactivity system (proxy), optimized component initialization, and better memory usage. The next reason is the fact that Composition API allows for better code organization, reusability, and composition. By using the Composition API, we can define component logic using composable functions that can be easily reused across different components. This makes code more maintainable and easier to understand, especially as an application grows in complexity. The reusability also allows us to use code written by others in our projects, cutting down development time. Lastly, Vue3 with Composition API has better TypeScript support than Vue2.',
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dowoo.kim%2Fstatic%2Fec554cc89db7e3dab620bea233a08996%2F3c17d%2Fvue3-composition-api.png&f=1&nofb=1&ipt=b321c41f8ebe9be4be6bc416104df62add5f19fd33b772d0ed4c748cfd651013&ipo=images'
  },
  {
    text: 'This leads to the next point of using TypeScript over JavaScript. One of the main benefits of TypeScript is that it is a strongly-typed language. This means that variables and functions have specific types that are declared ahead of time. This can help catch errors early in the development process, before they make it to production. With JavaScript, on the other hand, errors are often only discovered at runtime. Another benefit of TypeScript is that it provides better tooling and IDE support than JavaScript. Because TypeScript has explicit types, IDEs can provide more advanced code completion, refactoring, and debugging features than they can with JavaScript. TypeScript also makes it easier to work on large codebases with multiple developers. With JavaScript, it can be difficult to keep track of all the different functions and variables and how they interact with each other. TypeScript helps to solve this problem by providing better code organization and making it easier to understand how different parts of the code fit together.',
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftsh.io%2Fwp-content%2Fuploads%2F2020%2F09%2Ftypescript-vs-javascript-comparison_.jpg&f=1&nofb=1&ipt=3a33f4226090afec01af94082dd1fbae6f03ddfc3318bc843bc35db7ee94ccf0&ipo=images'
  },
  {
    text: "For the styling Tailwind CSS was chosen. It's a CSS framework that provides a set of pre-defined classes that can be used to quickly and easily style HTML elements. One of the main benefits of Tailwind CSS is that it allows for the rapid prototyping and building user interfaces without having to write a lot of custom CSS code.",
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjefrydco.id%2F_nuxt%2Fimg%2Fhow-tailwind-css-help-reduce-workload-by-jefrydco.833f9b8.jpg&f=1&nofb=1&ipt=446e5172b5d9016ee525ed2abfce4ef8e02a3f05e28065d2f00ba065424b32da&ipo=images'
  },
  {
    text: 'The frontend will be just a pretty cover without a backend. For that, I have decided to use Firebase. Although I am familiar with Express, and have developed my own servers before, using it would require a considerable amount of time. It would be a loss of time, as Firebase already offers the functionality I require. As Firebase is a big backend cloud, I have used only specific parts of it, namely the Authentication and Firestore Storage units. The former is used to keep track of registered users, while the latter is used for the demonstration of CRUD operations in this project.',
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.xda-developers.com%2Ffiles%2F2016%2F05%2FGoogles-Firebase-is-Expanding-to-a-Unified-App-Platform.png&f=1&nofb=1&ipt=b2d6a5003f550be4b5790d4f5319c4c9048b20185957bd89eb32e11b6a05b483&ipo=images'
  },
  {
    text: 'CRUD operations in this application are implemented in several parts. Each time a player submits a score to the leaderboard, new data is created in Firestore. The full leaderboard can be accessed on the leaderboard page, where it is read from the database. Each registered user can view and edit their username on any of their plays, or delete the play entirely.',
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-k1ORhC6_IsE%2FXmdOqDVKX6I%2FAAAAAAAAAB4%2F3ZOOVJEoU9I4DMYXUtd1fh0efqxV-yY2gCLcBGAsYHQ%2Fw1200-h630-p-k-no-nu%2Fcrud.jpg&f=1&nofb=1&ipt=732252829bead2d6ab574fb8c53ce92a547f4117c417197bcf480fbb29c5cf34&ipo=images'
  }
]
</script>
<template>
  <div class="flex justify-center">
    <div class="w-11/12 lg:w-3/5 mt-12 my-auto shadow-lg">
      <div class="flex flex-col sm:flex-row rounded-xl bg-white bg-clip-border">
        <div class="mx-4 -mt-6 translate-y-0 flex justify-center">
          <img
            class="w-auto rounded-lg m-auto h-96"
            src="../assets/DSC_0018.jpg"
            alt="card image"
          />
        </div>
        <div class="text-secondary flex-1 p-6">
          <h4 class="font-medium">About me</h4>
          <p class="opcacity-60 mb-3">
            My name is Shamil Mureyev. I became interested in frontend development during the
            COVID-19 pandemic when we were forced to stay at home. As I did not have access to my
            primary subject of biology at the time, I started studying HTML, CSS, and JavaScript.
            Due to my ongoing studies, progress was slow, but I gained substantial knowledge about
            this subject. Despite personal circumstances, I decided to pursue a Master's degree in
            biology while also deepening my understanding of frontend development. For the
            framework, I chose Vue3 due to its resemblance to pure HTML, which I found easier to get
            into than React, my original framework of choice. Currently, I have finished several
            courses on Vue3, and I have familiarized myself with the Composition API, RestAPI,
            Pinia, Firebase, and Tailwind.
          </p>
        </div>
      </div>
    </div>
  </div>
  <hr
    class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
  />

  <div class="w-10/12 lg:w-3/5 text-center mx-auto">
    <h4 class="font-semibold text-5xl mx-auto text-center mb-10">About project</h4>
    <p class="opcacity-60 mx-auto">
      The idea for the project came after I finished a race on another typeracer website. As a
      person of science, I had an idea to use the fun of typing for learning scientific terms. That
      was the basic idea. Currently, there are only a small number of terms that you can learn by
      typing, most of them being common knowledge, but nonetheless useful definitions.
    </p>
    <p class="opcacity-60 mx-auto">
      For this project I had used various technologies, and in next section I will go over them one
      by one. The code for this project can be
      <a
        href="https://github.com/Grimdeter/type-racer"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >found on GitHub</a
      >
    </p>
  </div>
  <div class="my-14">
    <carousel :items-to-show="1.1" :wrap-around="true">
      <slide v-for="slide in carouselObjects" :key="slide.text">
        <div class="flex justify-center">
          <div class="w-11/12 my-auto shadow-lg">
            <div class="flex flex-col lg:flex-row rounded-xl bg-white bg-clip-border">
              <div class="text-secondary flex-1 p-6 flex align-middle">
                <p class="opcacity-60 my-auto">
                  {{ slide.text }}
                </p>
              </div>
              <div class="mx-4 -mt-6 translate-y-0 flex justify-center">
                <img :src="slide.imgLink" class="w-auto rounded-lg m-auto h-96" />
              </div>
            </div>
          </div>
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>
