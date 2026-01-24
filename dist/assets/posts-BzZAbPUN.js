import{l as n,m as a}from"./app-CXiOTy94.js";const o=n("posts",()=>{const e=a([{id:"mastering-ssg",title:"Mastering Static Site Generation",excerpt:"How SSG is redefining performance on the modern web.",date:"Oct 12, 2025",category:"Engineering",readTime:"8 min read",author:"M. Kazi",content:`
        <p>Static Site Generation (SSG) has evolved from simple HTML emitters to sophisticated, hydration-aware build engines. In 2026, the boundary between static and dynamic is blurring.</p>
        <h2>The Performance Mandate</h2>
        <p>Modern users expect instant interactions. Pre-rendering the critical path ensures that the Initial Meaningful Paint happens within milliseconds, while subsequent client-side navigation feels native.</p>
        <blockquote>"The fastest request is the one that never leaves the edge."</blockquote>
        <p>By leveraging Vite-SSG, we distribute processed HTML to global CDNs, reducing Time to First Byte (TTFB) to negligible levels.</p>
        <h2>Hydration Strategies</h2>
        <p>Partial hydration allows us to selectively hydrate interactive components while keeping the rest as static HTML. This approach significantly reduces JavaScript bundle sizes and improves Time to Interactive (TTI).</p>
      `},{id:"design-tokens",title:"Scale with Design Tokens",excerpt:"Building resilient systems with semantic variables.",date:"Oct 10, 2025",category:"Design",readTime:"6 min read",author:"M. Kazi",content:`
        <p>Design tokens are the atomic units of a design system. They represent the smallest pieces of design decisions, capturing visual attributes like colors, typography, and spacing.</p>
        <h2>Semantic vs Primitive</h2>
        <p>Primitive tokens represent raw values like <code>#3b82f6</code>, while semantic tokens map to usage contexts like <code>color-primary</code>. This separation allows for theme switching without touching component code.</p>
      `},{id:"future-of-vue",title:"The Future of Vue 3.5+",excerpt:"Exploring Vapor mode and the evolution of reactivity.",date:"Oct 08, 2025",category:"Vue",readTime:"10 min read",author:"M. Kazi",content:`
        <p>Vue 3.5 introduced significant improvements to the reactivity system. The upcoming Vapor mode promises even better performance by eliminating the virtual DOM overhead for pure components.</p>
        <h2>Signal-Based Reactivity</h2>
        <p>The new signal API provides fine-grained reactivity with better performance characteristics. Unlike Vue's traditional reactive objects, signals update only the parts of the DOM that actually changed.</p>
      `},{id:"engineering-culture",title:"Building Engineering Culture",excerpt:"How to foster technical excellence in distributed teams.",date:"Oct 05, 2025",category:"Leadership",readTime:"12 min read",author:"M. Kazi",content:`
        <p>Engineering culture isn't about ping pong tables and free snacks. It's about shared values, clear communication, and continuous improvement.</p>
        <h2>Psychological Safety</h2>
        <p>The foundation of any healthy engineering culture is psychological safety. Team members must feel safe to take risks, ask questions, and admit mistakes without fear of punishment.</p>
      `}]);return{posts:e,getPostById:t=>e.value.find(i=>i.id===t)}});export{o as u};
