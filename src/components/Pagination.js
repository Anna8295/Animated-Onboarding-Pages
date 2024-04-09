import React from "react";
import { StyleSheet, View } from "react-native";
import Dot from "./Dot";


const Pagination = ({data, x}) => {

  return(
    <View style={styles.paginationContanier}>
       {data.map((_, index) => {
        return <Dot key={index} index={index} x={x}/>
       })}
    </View>
  )
}

export default Pagination;

const styles = StyleSheet.create({
    paginationContanier:{
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }

})