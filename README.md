# **Expo App**  

This repository contains a React Native app built using **Expo**. The app is designed as a prototype and includes features such as state management, navigation, and screen-based components.  

---

## **Table of Contents**  

- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
- [Running the App](#running-the-app)  
- [Folder Structure](#folder-structure)  
- [Functionality](#functionality)  
- [Tech Stack](#tech-stack)  

---

## **Features**  

- **File-Based Navigation**: Lightweight and efficient routing for smaller applications.  
- **State Management**: Simplified state sharing between components using Zustand.  
- **Dynamic Screens**: Customizable dedicated screens for better UI/UX handling.  
- **Reusable Components**: Shared UI components for consistency and maintainability.  
- **Expo Tooling**: Rapid prototyping and simplified development workflows.  

---

## **Prerequisites**  

Before running this project, ensure you have the following installed:  

- **Node.js**: v14.x or newer  
- **Git**: For cloning the repository  
- **Expo Go App**: Available on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/app/expo-go/id982107779) if not using simulator 

---

## **Getting Started**  

Follow these steps to set up the project locally:  

1. **Clone the Repository**:  
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```  

2. **Install Dependencies**:  
   Run the following command to install the necessary packages:  
   ```bash
   npm install
   ```  

3. **Start the Development Server**:  
   Use the following command to launch the Expo development server:  
   ```bash
   npx expo start
   ``` 
   Or

   ```bash
   npm run start 
   ```

---

## **Running the App**  

After starting the development server:  

1. **Using Expo Go**:  
   - Open the Expo Go app on your device.  
   - Scan the QR code displayed in your terminal or browser.  

2. **Using a Simulator**:  
   - For **iOS**, press `i` to open the app in an iOS simulator (macOS required).  
   - For **Android**, press `a` to open the app in an Android emulator.  

---

## **Folder Structure**  

Here’s an overview of the folder structure:  

```
project-directory/  
├── assets/               # Static assets (e.g., images, fonts)  
├── components/           # Reusable UI components  
├── app/              # Screen-specific components  
|   ├── index.tsx
|   ├── _layout.tsx
│   ├── address/
|       ├── _layout.tsx
│       ├── HomeScreen.tsx    # Example home screen  
│       ├── LocationPicker.tsx  
|       ├── ManualAddLocationPicker.tsx 
│       └── ...
├── store/                # Zustand state management files  
└── babel.config.js       # babel configuration file  
└── metro.config.js       # metro configuration file  
└── tailwind.config.js    # tailwindcss configuration file  
└── global.css            # global css for tailwindcss 
└── package.json          # Project dependencies  
```  

---

## **Functionality**  

### **Key Features and Functionalities**  

1. **File-Based Navigation**  
   - Screens are automatically linked based on their file structure.  
   - Simplifies route management and reduces boilerplate.  

2. **Global State Management with Zustand**  
   - Efficient state sharing between components.  
   - Reduces complexity compared to Redux while retaining flexibility.  

3. **Location Management**  
   - **LocationPicker.tsx**: Allows users to select a location dynamically.  
   - **ManualAddLocationPicker.tsx**: Enables manual input for location details.  

4. **Reusable Components**  
   - Common UI elements (e.g., buttons, input fields) are designed for reuse across screens.  

5. **Customizable Screens**  
   - Screens are dedicated for specific features but can be tailored easily.  

---

## **Tech Stack**  

The project is built using the following technologies:  

- **React Native**: Cross-platform development framework.  
- **Expo**: Simplifies app creation and testing.  
- **Zustand**: Lightweight state management library.  
- **JavaScript/TypeScript**: For clean and maintainable code.
- **TailwindCss**: CSS framework for rapidly building custom user interfaces  