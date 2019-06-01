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

export const getDay = (date) {
    const date = new Date(date);
    switch(date){
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thrusday"
        case 5: return "Friday"
        case 6: return "Saturday"
    }
}