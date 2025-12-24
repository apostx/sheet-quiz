import{j as s}from"./jsx-runtime-u17CrQMm.js";import{O as S}from"./OptionButton-LQ1wjKYo.js";/* empty css              */const p=({question:e,selectedOptions:u,isAnswered:m,onSelectOption:h})=>s.jsx("div",{className:"max-w-3xl mx-auto",children:s.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6",children:[s.jsxs("div",{className:"flex items-start gap-3 mb-6",children:[s.jsx("h2",{className:"text-2xl font-bold flex-1",children:e.question}),e.note&&s.jsxs("div",{className:"relative group flex-shrink-0",children:[s.jsx("div",{className:"w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-help",children:"?"}),s.jsx("div",{className:"absolute bottom-full right-0 mb-2 hidden group-hover:block w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10",children:s.jsxs("div",{className:"relative",children:[e.note,s.jsx("div",{className:"absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"})]})})]})]}),s.jsx("div",{className:"space-y-3",children:e.options.map((t,g)=>s.jsx(S,{option:t,isSelected:u.has(t),isAnswered:m,isCorrect:e.correctOptions.includes(t),isMultiAnswer:e.isMultiAnswer,onClick:()=>h(t)},g))})]})});p.__docgenInfo={description:"",methods:[],displayName:"QuestionCard",props:{question:{required:!0,tsType:{name:"QuizQuestion"},description:""},selectedOptions:{required:!0,tsType:{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"},description:""},isAnswered:{required:!0,tsType:{name:"boolean"},description:""},onSelectOption:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: QuizOption) => void",signature:{arguments:[{type:{name:"QuizOption"},name:"option"}],return:{name:"void"}}},description:""}}};const q={title:"Components/QuestionCard",component:p,parameters:{layout:"padded"}},c={response:"Paris",hint:"It is known as the City of Light"},d={response:"London",hint:""},w={response:"Berlin",hint:""},O={response:"Madrid",hint:""},l={question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[c,d,w,O],correctOptions:[c],isMultiAnswer:!1},x={question:"What is 2 + 2?",note:"",options:[{response:"4",hint:"This is basic arithmetic"},{response:"3",hint:""},{response:"5",hint:""},{response:"22",hint:"This would be string concatenation"}],correctOptions:[{response:"4",hint:"This is basic arithmetic"}],isMultiAnswer:!1},o={args:{question:l,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},n={args:{question:x,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},r={args:{question:l,selectedOptions:new Set([c]),isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},i={args:{question:l,selectedOptions:new Set([c]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}},a={args:{question:l,selectedOptions:new Set([d]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set(),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    question: questionWithoutNote,
    selectedOptions: new Set(),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option1]),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option1]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option2]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...a.parameters?.docs?.source}}};const y=["Default","WithoutNote","OptionSelected","CorrectAnswerSubmitted","IncorrectAnswerSubmitted"];export{i as CorrectAnswerSubmitted,o as Default,a as IncorrectAnswerSubmitted,r as OptionSelected,n as WithoutNote,y as __namedExportsOrder,q as default};
