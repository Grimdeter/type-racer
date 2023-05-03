<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselObjects = [
  {
    text: 'The base of the entire project is Vue3 with CompositionAPI. Firstly, Vue3 with Composition API introduces several optimizations to improve the performance of applications. For instance, Vue3 has a faster virtual DOM, in part for the new reactivity system (proxy), optimized component initialization, and better memory usage. Next reason is the fact that Composition API allows for better code organization, reusability, and composition. By using the Composition API, we can define component logic using composable functions that can be easily reused across different components. This makes code more maintainable and easier to understand, especially as an application grows in complexity. The reusability also allows for us to use the code written by others in our projects, cutting down the develepment times. Lastly, Vue3 with Composition API has better TypeScript support than Vue2. ',
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dowoo.kim%2Fstatic%2Fec554cc89db7e3dab620bea233a08996%2F3c17d%2Fvue3-composition-api.png&f=1&nofb=1&ipt=b321c41f8ebe9be4be6bc416104df62add5f19fd33b772d0ed4c748cfd651013&ipo=images'
  },
  {
    text: 'This leads to the next point of using TypeScript over JavaScript. One of the main benefits of TypeScript is that it is a strongly-typed language. This means that variables and functions have specific types that are declared ahead of time. This can help catch errors early in the development process, before they make it to production. With JavaScript, on the other hand, errors are often only discovered at runtime. Another benefit of TypeScript is that it provides better tooling and IDE support than JavaScript. Because TypeScript has explicit types, IDEs can provide more advanced code completion, refactoring, and debugging features than they can with JavaScript. TypeScript also makes it easier to work on large codebases with multiple developers. With JavaScript, it can be difficult to keep track of all the different functions and variables and how they interact with each other. TypeScript helps to solve this problem by providing better code organization and making it easier to understand how different parts of the code fit together. ',
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftsh.io%2Fwp-content%2Fuploads%2F2020%2F09%2Ftypescript-vs-javascript-comparison_.jpg&f=1&nofb=1&ipt=3a33f4226090afec01af94082dd1fbae6f03ddfc3318bc843bc35db7ee94ccf0&ipo=images'
  },
  {
    text: "For the styling Tailwind CSS was chosen. It'a is a CSS framework that provides a set of pre-defined classes that can be used to quickly and easily style HTML elements. One of the main benefits of Tailwind CSS is that it allows for the rapid prototyping and building user interfaces without having to write a lot of custom CSS code.",
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjefrydco.id%2F_nuxt%2Fimg%2Fhow-tailwind-css-help-reduce-workload-by-jefrydco.833f9b8.jpg&f=1&nofb=1&ipt=446e5172b5d9016ee525ed2abfce4ef8e02a3f05e28065d2f00ba065424b32da&ipo=images'
  },
  {
    text: 'The frontend will be just a pretty cover without backend. For that I had decided to use Firebase. I am familiar with Express, as I had developed my own servers before, however it would require a considirable amount of time, and will be a loss of time, as firebase already offers the functionality I require. As firebase is a big backend cloud, I had used only a particular parts of it, namely Authetification and Firestore Storage units. The first used to keep track of registered users, while the second is used for the demonstration of CRUD of this project ',
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.xda-developers.com%2Ffiles%2F2016%2F05%2FGoogles-Firebase-is-Expanding-to-a-Unified-App-Platform.png&f=1&nofb=1&ipt=b2d6a5003f550be4b5790d4f5319c4c9048b20185957bd89eb32e11b6a05b483&ipo=images'
  },
  {
    text: 'CRUD in this application is realiset in several parts. Each time the player submits a score to the leaderboard, new data is created in Firestore. The full leaderboard can be accessed in the leaderboard page, being read from the database. Each registered user can view and edit username on any of their plays, or delete the play entirely. ',
    imgLink:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres.cloudinary.com%2Fpracticaldev%2Fimage%2Ffetch%2Fs--O2cjB-id--%2Fc_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000%2Fhttps%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2Fa3exuz06e9h212pandfr.png&f=1&nofb=1&ipt=1996a8cbd8ad09fbcb4af5840a2b95dd576e395ce43339987303fa57dd6338cc&ipo=images'
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
            My name is Mureyev Shamil. I took interest in frontend develepment during COVID-19
            pandemic, when we were forced to stay at our homes. As I didn't had access to my primary
            subject of biology at the time, I started studying HTML, CSS and JavaScript. Due to me
            still having to study, the process was slow, however, I picked up a substential
            knowledge about this subject. Due to personal circumstances, I had decided to try and
            take a Master's degree in biology, and while doing that, I had also been deepining my
            understangind of frontend. For the framework, I had chosen Vue3, because of its
            resemblense with pure HTML, which I found it easier to get into than the React, my
            original framework of choice. Currently, I had finished several courses on the Vue3, had
            familiriazed myself with Composition API, RestAPI, Pinia, Firebase and Tailwind.
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
      The idea for the project came after I had finished the race at another
      <a href="https://play.typeracer.com/">typeracer website</a>. As a person of science, I had an
      idea, if I can use the fun of typing for learning scientific terms. That was the base idea.
      Currently, there is a small number of terms that you can learn by typing, most of the being a
      common knowledge, but nonetheless a useful definitions.
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
    <carousel :items-to-show="1.1">
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
