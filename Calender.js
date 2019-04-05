import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View, ScrollView, Dimensions, FlatList } from 'react-native';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;


var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = ["","","January","February","March","April","May","June","July",
"August","September","October","November","December","",""];
export default class Calender extends React.Component {
    static navigationOptions = {
        header: null,
    }
    constructor() {
        super();
        this.state = {
            Days: [],
            Years: [],
            selectedYear:new Date().getFullYear(),
            selectedMonth:new Date().getMonth(),
        }
    }
    componentWillMount() {
        /////Month/Year//////            
        this.getDaysInMonth(4, 2019),
        this.getYears(1998,3000)
    }
    getDaysInMonth = (month, year) => {
        // Since no month has fewer than 28 days
        var date = new Date(year, month, 1);
        var days = [];

        while (date.getMonth() === month) {
            days.push({ date: date.getDate(), days: weekday[date.getDay()] });
            date.setDate(date.getDate() + 1);
        }
        this.setState({ Days: days });
    }
    getYears = (start, end) => {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        this.setState({ Years: ans });
    }
   
    handlerDate = (getDate) => {
        var index = getDate < 4 ?0  :getDate-4
        this.dateRef.scrollToIndex({ animated: true, index });
        this.setState({selectedDate:getDate})
    }
    handlerMonths = (month) => {
        const {selectedYear} = this.state
        var index = monthNames.indexOf(month)-2
        this.monthRef.scrollToIndex({ animated: true, index });
        this.setState({selectedMonth:monthNames.indexOf(month)})
        this.getDaysInMonth(index, selectedYear)
    }

    handlerYear = (year) => {
        const {selectedMonth} = this.state
        var index = this.state.Years.indexOf(year)-1
        this.yearRef.scrollToIndex({ animated: true, index });
        this.setState({selectedYear:year})
        this.getDaysInMonth( selectedMonth, year)
    }
        render() {
        const { Days,Years } = this.state
        const {needDate = false, needMonths = false, needYears = false} = this.props
        return (
            <View style={styles.container}>
               {needDate&&<View style={styles.Datecontainer}>
            
                    <FlatList
                        data={Days}
                        keyExtractor={(item,index)=>index.toString()}
                        horizontal
                        ref={(ref)=>this.dateRef=ref}                        
                        renderItem={({ item }) => 
                        <TouchableOpacity onPress={() =>this.handlerDate(item.date)}>
                        <View style={styles.cont}>
                            <Text style={styles.dateText}>{item.date}</Text>
                            <Text style={styles.dayText}>{item.days}</Text>
                        </View>
                        </TouchableOpacity>
                        }
                    />
            </View>}
            {needMonths&&<View style={styles.Monthcontainer}>
            <FlatList
                        data={monthNames}
                        keyExtractor={(item,index)=>index.toString()}
                        horizontal
                        ref={(ref)=>this.monthRef=ref}
                        initialScrollIndex={2}
                        renderItem={({ item }) =>
                        <TouchableOpacity onPress={() =>this.handlerMonths(item)}>
                          <View style={styles.month}>
                        <Text style={styles.monthText}>{item}</Text>
                             </View>
                        </TouchableOpacity>
                    }
                    />
            </View>}
           {needYears&&<View style={styles.Yearcontainer}>
            <FlatList
                        data={Years}
                        keyExtractor={(item,index)=>index.toString()}
                        horizontal
                        ref={(ref)=>this.yearRef=ref}
                        initialScrollIndex={this.state.Years.indexOf(new Date().getFullYear())-1}
                        renderItem={({ item }) =>
                        <TouchableOpacity onPress={() =>this.handlerYear(item)}>
                        <View style={styles.year}>
                        <Text style={styles.yearText}>{item}</Text>
                    </View>
                        </TouchableOpacity>
                    }
                    />
            </View>  }   
            {!needDate&&<View style={styles.Datecontainer}/>}
            {!needMonths&&<View style={styles.Monthcontainer}/>}
            {!needYears&&<View style={styles.Yearcontainer}/>}
        </View >

     
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: screenWidth,
        backgroundColor: 'white',

    },
    Datecontainer: {
        flex: 0.8,
        width: screenWidth,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    Monthcontainer: {
        flex: 0.8,
        width: screenWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    Yearcontainer: {
        flex: 0.9,
        width: screenWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    ScrollViewcontainer: {
        // width:screenWidth,
        flexDirection: 'row',
        // padding:12

    },
    cont: {
        width: screenWidth / 7,
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },

    dateText: {
        fontSize: 18,
        color: 'black',
        justifyContent: 'center',
        textAlign: 'center',
    },
    dayText: {
        fontSize: 12,
        color: 'gray',
        justifyContent: 'center',
        textAlign: 'center',
    },
    month: {
        width: screenWidth / 5,
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },
    monthText: {
        fontSize: 13,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    year: {
        width: screenWidth / 3,
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },
    yearText:{
        fontSize: 16,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});
