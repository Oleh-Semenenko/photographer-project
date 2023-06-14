<template>
  <div>
    <el-backtop :right="50" :bottom="50" />
    <section class="bg-white-100">
      <div class="w-full lg:pl-6 lg:flex justify-between">
        <div class="pt-6 px-6 lg:px-0 lg:pt-[300px]">
          <h1
            class="text-[24px] sm:text-[32px] md:text-[44px] lg:text-[52px] leading-[1.38] lg:absolute lg:top-[150px]
           lg:max-w-[70%] "
          >
            Hire
            <span class="italic relative z-20 after-element lg:after:w-[558px]">
              an amazing photographer</span><br>
            anywhere in the world
          </h1>
        </div>

        <div class="mt-8 lg:mt-0 w-full lg:max-w-[50%] lg:flex-grow  h-full lg:shrink-0">
          <img
            src="../assets/images/hero.jpg"
          >
        </div>
      </div>
    </section>

    <section class="py-8 md:py-16 lg:py-20 border-b-[16px] md:border-b-[20px] border-b-green-40">
      <div class="container mx-auto px-6">
        <ul class="lg:grid grid-cols-3 gap-10">
          <li class="pt-20 lg:pt-[120px] relative before-number" data-content="01">
            <p
              class="font-serif text-[20px] md:text-[24px] lg:text-[26px] text-grey-80 font-normal"
            >
              Find a photographer
            </p>
            <p class="mt-2 text-[16px] md:text-[18px] lg:text-[20px]">
              Choose a photographer for your task using a thoughtful search filter system.
            </p>
          </li>
          <li class="pt-20 lg:pt-[120px] relative before-number" data-content="02">
            <p
              class="font-serif text-[20px] md:text-[24px] lg:text-[26px] text-grey-80 font-normal"
            >
              Book a photography
            </p>
            <p class="mt-2 text-[16px] md:text-[18px] lg:text-[20px]">
              Specify the type of photography,
              date and time. Discuss order details
              in a chat with a photographer.
            </p>
          </li>
          <li class="pt-20 lg:pt-[120px] relative before-number" data-content="03">
            <p
              class="font-serif text-[20px] md:text-[24px] lg:text-[26px] text-grey-80 font-normal"
            >
              Enjoy the process
            </p>
            <p class="mt-2 text-[16px] md:text-[18px] lg:text-[20px]">
              Enjoy your photography knowing
              you’re in the hands of a professional.
              Expect photos at the specified time.
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-white-100 py-8 md:py-16 lg:py-20">
      <div class="container mx-auto px-6">
        <h2 class="text-[22px] md:text-[28px] lg:text-[36px] text-black-80">
          <span class="italic">Popular</span> photography types
        </h2>

        <ul class="flex flex-wrap gap-3 justify-center lg:gap-0 lg:flex-nowrap lg:divide-x-2 divide-green-40 mt-6">
          <li class="lg:pr-4">
            <div
              class="w-[185px] h-[185px] md:w-[160px] md:h-[160px]
            lg:w-full lg:h-full lg:grid grid-cols-2 grid-rows-2 gap-3"
            >
              <img
                src="../assets/images/individual/individual_1.jpg" alt="Example individual photo"
                class="lg:col-span-full h-full w-full object-cover"
              >
              <img
                src="../assets/images/individual/individual_2.jpg" alt="Example individual photo"
                class="hidden lg:block"
              >
              <img
                src="../assets/images/individual/individual_3.jpg" alt="Example individual photo"
                class="hidden lg:block"
              >
            </div>
            <p class="mt-2 lg:mt-0 text-[18px] md:text-[20px] text-green-100">Individual</p>
          </li>
          <li class="lg:px-4">
            <div
              class="w-[185px] h-[185px] md:w-[160px] md:h-[160px]
            lg:w-full lg:h-full lg:grid grid-cols-2 grid-rows-2 gap-3"
            >
              <img
                src="../assets/images/product/product_1.jpg" alt="Example product photo"

                class="lg:col-span-full h-full w-full object-cover"
              >
              <img
                src="../assets/images/product/product_2.jpg" alt="Example product photo"
                class="hidden lg:block"
              >
              <img
                src="../assets/images/product/product_3.jpg" alt="Example product photo"
                class="hidden lg:block"
              >
            </div>
            <p class="mt-2 lg:mt-0 text-[18px] md:text-[20px] text-green-100">Product</p>
          </li>
          <li class="lg:px-4">
            <div
              class="w-[185px] h-[185px] md:w-[160px] md:h-[160px]
            lg:w-full lg:h-full lg:grid grid-cols-2 grid-rows-2 gap-3"
            >
              <img
                src="../assets/images/fashion/fashion_1.jpg" alt="Example fashion photo"

                class="lg:col-span-full h-full w-full object-cover"
              >
              <img
                src="../assets/images/fashion/fashion_2.jpg" alt="Example fashion photo"
                class="hidden lg:block"
              >
              <img
                src="../assets/images/fashion/fashion_3.jpg" alt="Example fashion photo"
                class="hidden lg:block"
              >
            </div>
            <p class="mt-2 lg:mt-0 text-[18px] md:text-[20px] text-green-100">Fashion</p>
          </li>
          <li class="lg:pl-4">
            <div
              class="w-[185px] h-[185px] md:w-[160px] md:h-[160px]
            lg:w-full lg:h-full lg:grid grid-cols-2 grid-rows-2 gap-3"
            >
              <img
                src="../assets/images/family/family_1.jpg" alt="Example family photo"
                class="lg:col-span-full h-full object-cover"
              >
              <img
                src="../assets/images/family/family_2.jpg" alt="Example family photo"
                class="hidden lg:block"
              >
              <img
                src="../assets/images/family/family_3.jpg" alt="Example family photo"
                class="hidden lg:block"
              >
            </div>
            <p class="mt-2 lg:mt-0 text-[18px] md:text-[20px] text-green-100">Family</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="py-8 md:py-16 lg:py-20 text-center lg:text-left bg-transparent">
      <div
        class="container md:mx-auto lg:mr-0 lg:pr-6 flex flex-col lg:flex-row-reverse
        gap-5 lg:gap-7 xl:gap-10 justify-between text-left"
      >
        <div class="px-6 lg:px-0 lg:w-[50%] flex-grow">
          <h2 class="text-[22px] md:text-[28px] lg:text-[36px] text-black-80">
            Are you a <span class="italic">photographer</span> who wants
            to develop and get more orders?
          </h2>

          <ul class="space-y-[24px] mt-5">
            <li class="flex items-start gap-3">
              <IconStar class="shrink-0" />
              <div>
                <p class="font-normal text-[18px] md:text-[22px] lg:text-[26px]">The best place for your portfolio</p>
                <p class="text-[16px] md:text-[18px] lg:text-[20px]">
                  Now you can leave social networks for your personal life and not spend money on your
                  own website, let Photographer be your working tool.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <IconLike class="shrink-0" />
              <div>
                <p class="font-normal text-[18px] md:text-[22px] lg:text-[26px]">You will be noticed here</p>
                <p class="text-[16px] md:text-[18px] lg:text-[20px]">
                  Every day, hundreds of clients use our service to find a photographer,
                  your profile will definitely be noticed.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <IconGear class="shrink-0" />
              <div>
                <p class="font-normal text-[18px] md:text-[22px] lg:text-[26px]">Flexible settings</p>
                <p class="text-[16px] md:text-[18px] lg:text-[20px]">
                  Various types of photography, detailed setting of price lists,
                  structuring of all orders, the possibility of promotion to the top city photographers.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div class="block relative before-bg pt-8 md:pt-16 lg:pt-20">
          <img
            src="../assets/images/screen_2.png"
            alt="Screen"
            width="500"
            height="295"
            class="absolute top-3 left-6 lg:left-7 w-[300px] md:w-[400px] lg:w-[500px]
            h-[188px] md:h-[240px] lg:h-[295px]"
          >
          <img
            src="../assets/images/screen_1.png"
            alt="Screen"
            width="500"
            height="295"
            class="absolute top-[45%] lg:top-[25%] left-[62px] w-[300px] md:w-[400px] lg:w-[500px]
            fh-[188px] md:h-[240px] lg:h-[295px]"
          >
        </div>
      </div>
      <NuxtLink to="/auth/login" class="text-center ">
        <Button class="w-[300px] lg:w-1/2 lg:ml-[60px] mt-5 md:mt-8 bg-green-80 text-white-100">
          Create account
        </Button>
      </NuxtLink>
    </section>

    <section class="py-8 md:py-16 lg:py-0 bg-white-100 border-b-[16px] border-b-green-40">
      <div class="container px-6 mx-auto lg:pr-0 flex justify-between gap-8">
        <div class="lg:pt-20 w-full space-y-8">
          <h2 class="text-[22px] md:text-[28px] lg:text-[36px] text-black-80">
            <span class="italic">Frequently</span> asked questions
          </h2>

          <el-collapse accordion>
            <el-collapse-item title="What is the prepayment amount for booking?">
              Prepayment is 20 percent of the cost of photography.
              After the client makes a prepayment, the order is considered confirmed.
            </el-collapse-item>
            <el-collapse-item title="What if I need to reschedule or cancel?">
              Prepayment is 20 percent of the cost of photography.
              After the client makes a prepayment, the order is considered confirmed.
            </el-collapse-item>
            <el-collapse-item title="What if I want to take photos at night?">
              Prepayment is 20 percent of the cost of photography.
              After the client makes a prepayment, the order is considered confirmed.
            </el-collapse-item>
            <el-collapse-item title="How do you guarantee the protection of funds?">
              Prepayment is 20 percent of the cost of photography.
              After the client makes a prepayment, the order is considered confirmed.
            </el-collapse-item>
            <el-collapse-item title="What happens if it’s raining?">
              Prepayment is 20 percent of the cost of photography.
              After the client makes a prepayment, the order is considered confirmed.
            </el-collapse-item>
            <el-collapse-item title="How long in advance should I book my shoot?">
              Prepayment is 20 percent of the cost of photography.
              After the client makes a prepayment, the order is considered confirmed.
            </el-collapse-item>
          </el-collapse>
        </div>

        <div
          class="hidden lg:block w-[50%] h-full shrink-0 border-t-[20px]
         border-t-green-40 border-r-[20px] border-r-gray-50"
        >
          <img src="../assets/images/main_faq.jpg" lazy alt="Woman in the car">
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'main'
})
</script>

<style lang="scss">
.el-input-group__append .el-button {
  @apply flex items-center justify-center
}

.before-number::before {
  content: attr(data-content);
  display: block;
  font-size: 142px;
  position: absolute;
  top: 0;
  left: 0;
  color: var(--grey-50);
  z-index: -10;
}

.before-bg::before {
  content: '';
  display: block;
  width: 550px;
  height: 350px;
  background-color: var(--grey-50);
}

@media screen and (max-width: 768px) {
  .before-number::before {
    font-size: 120px;
  }
}
@media screen and (max-width: 1024px) {
  .before-bg::before {
    width: 100%;
    height: 300px;
  }
}

.el-collapse .el-collapse-item__header {
  @apply py-6 text-[20px]
}
</style>
