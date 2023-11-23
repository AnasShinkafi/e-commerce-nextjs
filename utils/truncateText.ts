
export const truncateText = ( str: string) => {
    if(str.length < 25 ) return str;
    return str.substring(0, 25) + '...';  // return first 25 characters and add ... at the end.
}

