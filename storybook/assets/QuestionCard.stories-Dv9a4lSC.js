import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as n}from"./iframe-yxFducXL.js";import{u as y,O as C}from"./OptionButton-DnttzEyg.js";import{H as S}from"./HtmlContent-DU4oKYGB.js";/* empty css              */import"./preload-helper-PPVm8Dsz.js";const x=({question:e,selectedOptions:b,isAnswered:v,onSelectOption:j})=>{const[o,r]=n.useState(!1),a=n.useRef(!1),w=n.useRef(null),f=n.useRef(null),g=n.useCallback(()=>{r(!1),a.current=!1},[]);y(w,o,g);const i=n.useCallback(()=>{f.current&&(f.current.scrollTop=0)},[]);return n.useEffect(()=>{o&&i()},[o,i]),t.jsx("div",{className:"max-w-3xl mx-auto",children:t.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-4 sm:p-6",children:[t.jsxs("div",{className:"flex items-start gap-3 mb-6",children:[t.jsx("h2",{className:"text-base sm:text-lg font-semibold leading-relaxed flex-1",children:t.jsx(S,{html:e.question,variant:"light"})}),e.note&&t.jsxs("div",{ref:w,className:"relative flex-shrink-0",onMouseEnter:()=>{o||(i(),r(!0))},onMouseLeave:()=>{a.current||r(!1)},children:[t.jsx("div",{className:"w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-pointer",onClick:s=>{s.stopPropagation(),o||(i(),r(!0)),a.current=!0},onTouchEnd:s=>{s.stopPropagation(),s.preventDefault(),o||(i(),r(!0)),a.current=!0},role:"button","aria-label":"Show note","aria-expanded":o,children:"?"}),t.jsxs("div",{className:`fixed sm:absolute inset-4 sm:inset-auto sm:top-full sm:right-0 sm:mt-2 sm:w-80 sm:max-h-[70vh] flex flex-col bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 ${o?"flex":"hidden"}`,children:[t.jsx("div",{className:"flex-shrink-0 self-end m-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white sm:hidden cursor-pointer",onClick:s=>{s.stopPropagation(),g()},onTouchEnd:s=>{s.stopPropagation(),s.preventDefault(),g()},role:"button","aria-label":"Close note",children:t.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),t.jsx("div",{ref:f,className:"overflow-y-auto px-3 pb-3 sm:p-3",children:t.jsx(S,{html:e.note,variant:"tooltip"})})]})]})]}),t.jsx("div",{className:"space-y-3",children:e.options.map((s,A)=>t.jsx(C,{option:s,isSelected:b.has(s),isAnswered:v,isCorrect:e.correctOptions.includes(s),isMultiAnswer:e.isMultiAnswer,onClick:()=>j(s)},`opt-${A}-${s.response.slice(0,15)}`))})]})})};x.__docgenInfo={description:"",methods:[],displayName:"QuestionCard",props:{question:{required:!0,tsType:{name:"QuizQuestion"},description:""},selectedOptions:{required:!0,tsType:{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"},description:""},isAnswered:{required:!0,tsType:{name:"boolean"},description:""},onSelectOption:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: QuizOption) => void",signature:{arguments:[{type:{name:"QuizOption"},name:"option"}],return:{name:"void"}}},description:""}}};const W={title:"Components/QuestionCard",component:x,parameters:{layout:"padded"}},m={response:"Paris",hint:"It is known as the City of Light"},O={response:"London",hint:""},q={response:"Berlin",hint:""},N={response:"Madrid",hint:""},h={question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[m,O,q,N],correctOptions:[m],isMultiAnswer:!1},k={question:"What is 2 + 2?",note:"",options:[{response:"4",hint:"This is basic arithmetic"},{response:"3",hint:""},{response:"5",hint:""},{response:"22",hint:"This would be string concatenation"}],correctOptions:[{response:"4",hint:"This is basic arithmetic"}],isMultiAnswer:!1},l={args:{question:h,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},c={args:{question:k,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},p={args:{question:h,selectedOptions:new Set([m]),isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},d={args:{question:h,selectedOptions:new Set([m]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}},u={args:{question:h,selectedOptions:new Set([O]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set(),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    question: questionWithoutNote,
    selectedOptions: new Set(),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option1]),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option1]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option2]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...u.parameters?.docs?.source}}};const z=["Default","WithoutNote","OptionSelected","CorrectAnswerSubmitted","IncorrectAnswerSubmitted"];export{d as CorrectAnswerSubmitted,l as Default,u as IncorrectAnswerSubmitted,p as OptionSelected,c as WithoutNote,z as __namedExportsOrder,W as default};
