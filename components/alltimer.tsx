import { ScrollView, View } from "react-native";

import Timer from "./timer";
import Timeform from "./timeform";


export default function alltimer({id,label,elapsed,isRunning,editFormOpen}){
    if(editFormOpen){
        return<Timeform id={id} label={label} elapsed={elapsed} />;
    }
    return(
       <Timer id={id} label={label} elapsed={elapsed} isRunning={isRunning}/>
    );
}