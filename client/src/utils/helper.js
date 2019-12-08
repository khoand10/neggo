export const compare = ( a, b ) => {
    if ( a.slot < b.slot ){
      return -1;
    }
    if ( a.slot > b.slot ){
      return 1;
    }
    return 0;
}