### 1. Choosing Expo over React Native  
I chose **Expo** over traditional React Native for prototyping because this project is not a production-level application, and Expo provides tools better suited for rapid development and prototyping. Expo simplifies the development process by offering a rich set of prebuilt components, extensive libraries, and seamless integration with third-party tools. Additionally, Expo's **excellent documentation and active community support** significantly reduce the learning curve and troubleshooting time. These factors make Expo a reliable choice for short-term or time-constrained projects, where production-grade optimizations are not a priority.  

---

### 2. Using Limited Global State  
For this project, I implemented a **limited global state** to manage data that needed to be shared across multiple components. While it is possible to pass state between components as props, using global state offers more flexibility and scalability. It reduces the overhead of prop drilling, especially in scenarios where data flows through deeply nested components.  
By opting for a limited global state, I ensured:  
- **Reusability**: Shared state can be easily accessed by any component without additional boilerplate.  
- **Flexibility**: Centralized state management makes it easier to handle changes and add new features in the future.  

However, I intentionally kept global state usage minimal to avoid unnecessary complexity and potential performance issues that arise from excessive reliance on global states.  

---

### 3. Choosing Zustand over Redux  
I opted for **Zustand** instead of Redux for state management because Zustand provides the same functionality with significantly less boilerplate and setup overhead. Redux is a powerful tool, but it requires developers to follow a strict structure involving actions, reducers, and a centralized store, which can be cumbersome for smaller-scale projects.  

In contrast, Zustand offers:  
- **Simplicity**: It allows developers to define and access state with minimal setup and syntax.  
- **Flexibility**: Zustand supports reactive updates and makes state manipulation straightforward.  
- **Developer-friendly Documentation**: Zustand has concise, well-written documentation that helps developers quickly understand and implement its features.  

Although the **Context API** is a viable alternative for smaller projects, I preferred Zustand because of its simplicity and ability to handle state changes with less effort and code.  

---

### 4. File-Based Navigation Over Traditional Navigation  
I chose **file-based navigation** instead of traditional navigation libraries like React Navigation because traditional navigation felt like an overkill for this assignment. With the time constraints in mind, file-based navigation provided a more efficient and lightweight solution for implementing routes.  

Key advantages of file-based navigation include:  
- **Ease of Implementation**: File-based navigation allows routes to be automatically linked based on the file structure, reducing the need for manual configuration.  
- **Efficiency**: It eliminates unnecessary complexities, which is especially useful for smaller projects with fewer screens.  
- **Simplicity**: It keeps the codebase organized and easy to maintain.  

Although traditional navigation libraries offer more advanced features, they introduce additional complexity that was not required for this assignment. Considering the limited scope, file-based navigation was a more practical choice.  

---

### 5. Choosing Between Reusable Components and Dedicated Screens  
In this project, I opted for **dedicated screens** instead of creating fully reusable components. While reusable components are excellent for improving maintainability and reducing duplication, they were not the best fit in this scenario due to the following reasons:  

1. **Customization Needs**:  
   Each screen required different padding, styles, and unique UI elements. While these could be handled with conditional rendering, doing so would introduce extra edge cases and increase the complexity of the reusable component.  

2. **Tight Coupling**:  
   Making these screens reusable would result in tightly coupled code, where even minor changes could ripple through multiple components, leading to a higher maintenance burden.  

By choosing dedicated screens, I was able to:  
- Simplify the codebase and ensure each screen could be independently customized.  
- Avoid unnecessary edge cases and complex logic.  
- Maintain a cleaner separation of concerns, where each screen focuses on its own functionality.  

However, I acknowledge that reusable components offer better maintainability in the long run, and I would have prioritized them if the screens had more shared features or if the project required long-term scaling.  

---

### 6. Functionality to Improve: Reusable Components and Dedicated Screens  
One area I would like to improve in this project is the **creation of reusable components for shared functionality** while still maintaining dedicated screens for unique features.  

For example:  
- The **LocationPicker.ts** and **ManualAddLocationPicker.tsx** screens have overlapping functionality that could benefit from reusable components.  
- By isolating shared elements into reusable components, I can simplify screen creation, reduce duplication, and improve maintainability.  

I plan to:  
1. **Extract common functionality** (e.g., input fields, button styles, or shared logic) into reusable components.  
2. Use these components to build dedicated screens, ensuring that unique features are implemented independently without compromising maintainability.  

This approach will strike a balance between code reusability and flexibility, allowing for more scalable and maintainable development.  

---

### 7. Validations
I this i also added some basic validation

By making these decisions, I aimed to create a prototype that is simple, efficient, and easy to adapt within the given constraints. Each choice reflects a balance between rapid development, maintainability, and scalability for future iterations.