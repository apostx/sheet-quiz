import{j as s}from"./jsx-runtime-u17CrQMm.js";import{r as d}from"./iframe-MxnrIXRB.js";import{u as b,O as A}from"./OptionButton-DjZWZbMf.js";import{H as q}from"./index-C-jRwWVX.js";import"./preload-helper-PPVm8Dsz.js";const h=({question:e,selectedOptions:S,isAnswered:w,onSelectOption:f})=>{const[o,u]=d.useState(!1),m=d.useRef(null),x=d.useCallback(()=>u(!1),[]);return b(m,o,x),s.jsx("div",{className:"max-w-3xl mx-auto",children:s.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-4 sm:p-6",children:[s.jsxs("div",{className:"flex items-start gap-3 mb-6",children:[s.jsx("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold flex-1",children:e.question}),e.note&&s.jsxs("div",{ref:m,className:"relative group flex-shrink-0",children:[s.jsx("div",{className:"w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-pointer",onClick:t=>{t.stopPropagation(),u(!o)},role:"button","aria-label":"Show note","aria-expanded":o,children:"?"}),s.jsx("div",{className:`fixed sm:absolute inset-4 sm:inset-auto sm:top-full sm:right-0 sm:mt-2 sm:w-80 max-h-[90vh] sm:max-h-[70vh] overflow-y-auto p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 ${o?"block":"hidden sm:group-hover:block"}`,children:s.jsx(q,{html:e.note,variant:"tooltip"})})]})]}),s.jsx("div",{className:"space-y-3",children:e.options.map((t,O)=>s.jsx(A,{option:t,isSelected:S.has(t),isAnswered:w,isCorrect:e.correctOptions.includes(t),isMultiAnswer:e.isMultiAnswer,onClick:()=>f(t)},`opt-${O}-${t.response.slice(0,15)}`))})]})})};h.__docgenInfo={description:"",methods:[],displayName:"QuestionCard",props:{question:{required:!0,tsType:{name:"QuizQuestion"},description:""},selectedOptions:{required:!0,tsType:{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"},description:""},isAnswered:{required:!0,tsType:{name:"boolean"},description:""},onSelectOption:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: QuizOption) => void",signature:{arguments:[{type:{name:"QuizOption"},name:"option"}],return:{name:"void"}}},description:""}}};const z={title:"Components/QuestionCard",component:h,parameters:{layout:"padded"}},l={response:"Paris",hint:"It is known as the City of Light"},g={response:"London",hint:""},y={response:"Berlin",hint:""},v={response:"Madrid",hint:""},p={question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[l,g,y,v],correctOptions:[l],isMultiAnswer:!1},N={question:"What is 2 + 2?",note:"",options:[{response:"4",hint:"This is basic arithmetic"},{response:"3",hint:""},{response:"5",hint:""},{response:"22",hint:"This would be string concatenation"}],correctOptions:[{response:"4",hint:"This is basic arithmetic"}],isMultiAnswer:!1},n={args:{question:p,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},r={args:{question:N,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},i={args:{question:p,selectedOptions:new Set([l]),isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},a={args:{question:p,selectedOptions:new Set([l]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}},c={args:{question:p,selectedOptions:new Set([g]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set(),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    question: questionWithoutNote,
    selectedOptions: new Set(),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option1]),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option1]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option2]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...c.parameters?.docs?.source}}};const W=["Default","WithoutNote","OptionSelected","CorrectAnswerSubmitted","IncorrectAnswerSubmitted"];export{a as CorrectAnswerSubmitted,n as Default,c as IncorrectAnswerSubmitted,i as OptionSelected,r as WithoutNote,W as __namedExportsOrder,z as default};
