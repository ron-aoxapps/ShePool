import { useEffect, useState } from "react";
import AppNavigation from "./src/navigation/appNavigation";
import SplashScreen from "react-native-splash-screen";

export default function App() {

   useEffect(() => {
       setTimeout(() => {
         SplashScreen.hide()
      }, 5000);
   }, []);

   return (
     <AppNavigation /> 
   );
}