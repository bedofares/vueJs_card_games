<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

export default {
  name: "calculater-tag",
  data() {
    return {
      calc: '',
      value: null,
      numberss: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'],
      operators: ['+', '-', '/', '*']
    };
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      if (!isNaN(event.key)) {
        console.log("number")
        this.calc += event.key
        console.log(event.key)
      } else if (event.key == '+' || event.key == '/' || event.key == '*' || event.key == '-') {
        console.log("number")
        this.calc += event.key
        console.log(event.key)
      } else {
        console.log("not a number")
      }

    })
  },
  methods: {
    setModifier(x) {
      this.calc += x
      console.log(this.calc)
    },
    calculate() {
      this.value = eval(this.calc)
      this.calc = this.value
      console.log(this.value)
    },
    reset() {
      this.value = null
      this.calc = ''
    },
    Backspace() {
      this.calc = this.calc.slice(0, -1) //'abcde'
      console.log(this.calc)
    },
    key(e) {
      console.log(e.keyCode)
    }

  }

}

</script>


<template>
  <section class="container">
    <div class="d-flex  justify-content-center align-items-center text-center  text-black fw-bold">
      <div class="calculator w-9/12	 	md:w-2/6 p-2	 bg-gray-200">
        <div class="calc p-2 break-words">
          {{ calc }}
        </div>
        <div class="value p-2 break-words">
          {{ value }}
        </div>
        <div class="buttons">
          <div v-for="n in numberss" v-on:click="setModifier(n)"
               class="btnn w-2/6 flex justify-center align-items-center	text-black hover:bg-green-200 cursor-pointer">
            {{ n }}
          </div>

          <div v-for="op in operators" v-on:click="setModifier(op)"
               class="btnn w-2/6 flex justify-center align-items-center	text-black hover:bg-green-200 cursor-pointer">
            {{ op }}
          </div>
          <div v-on:click="calculate" class="btn1 w-2/6 flex justify-center align-items-center text-black hover:bg-green-200 cursor-pointer">
            =
          </div>

          <div v-on:click="reset" class="btn1 w-2/6 flex justify-center align-items-center text-black hover:bg-green-200 cursor-pointer">
            C
          </div>
          <div v-on:click="Backspace"
               class="btn1 w-2/6 flex justify-center align-items-center text-black hover:bg-green-200 pointer-event d-flex justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace"
                 viewBox="0 0 16 16">
              <path
                  d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
              <path
                  d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
            </svg>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

.calculator {

  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}


.btnn {
  height: 50px;
  border: 1px solid transparent;
  transition: all 0.8s;
  border-radius: 3px;
}

.btnn:hover {
  transition: all 0.25s;
}

.btn1 {
  height: 50px;
  border: 1px solid transparent;
  transition: all 0.8s;
  border-radius: 3px;
}

.btn1:hover {
  color: black;
  cursor: pointer;
  transition: all 0.25s;
}

.calc {
  height: 30px;
  line-height: 30px;
}

.value {
  height: 50px;
  line-height: 50px;
  color: black;
  font-size: 30px;
}
</style>
