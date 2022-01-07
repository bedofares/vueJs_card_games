import {mount} from "@vue/test-utils";
import Pokemon from "../components/pokemon.vue";
test('Pokemon component display name' , ()=>{
    const wrapper = mount(Pokemon ,{
        props:{
            name:'Pikachu',
            index:23,
        },
    });

    expect(wrapper.text()).toBe('Pikachu')
});

//snapshot
test('Pokeman html' , () =>{
    const wrapper = mount(Pokemon ,{
        props:{
            name:'Pikachu',
            index:23,
        },
    });

    expect(wrapper.html()).toMatchSnapshot()
})