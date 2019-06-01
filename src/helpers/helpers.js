export const getMonth = (month) => {
    switch(month){
        case 1: return "January"
        case 2: return "Februray"
        case 3: return "March"
        case 4: return "Apri"
        case 5: return "May"
        case 6: return "June"
        case 7: return "July"
        case 8: return "August"
        case 9: return "September"
        case 10: return "Octiber"
        case 11: return "November"
        case 12: return "December"
    }
}

export const getDay = (year, month, day) => {
    debugger
    // console.log(new Date(date))
    const dateDay = new Date(year, month, day).getDay();
    switch(dateDay){
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thrusday"
        case 5: return "Friday"
        case 6: return "Saturday"
    }
}

export const mapDateDay = (year, month, day) => {
    // debugger
    // console.log(new Date(date))
    const dateDay = new Date(year, month, day).getDay();
    switch(dateDay){
        case 0: return 0
        case 1: return 1
        case 2: return 2
        case 3: return 3
        case 4: return 4
        case 5: return 5
        case 6: return 6
    }
}