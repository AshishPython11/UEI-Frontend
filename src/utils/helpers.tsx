export const isNullOrUndefined = (value: unknown) =>
    value === undefined || value === null;


export const getDateFormat = (value: any) => {
    // if (value == null) {
    //   return "DD-MM-YYYY";
    // }
  
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
    return date?.toLocaleDateString("en-GB", options); // Format date as "12 May 1998"
  };
  

  // for compare values 
  export function deepEqual(a:any, b:any) {
    if (a === b) return true;
      if (a === null || b === null) { return false }
    if (typeof a !== 'object' || typeof b !== 'object') return false;
  
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
  
    if (keysA.length !== keysB.length) return false;
  
    for (let key of keysA) {
      if (!keysB.includes(key)
   || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
  
    return true;
  }

  export const hasSubMenu = (menuListdata:any, menuName:any) => {
    // console.log("Type of menuListdata:", typeof menuListdata);
    if (!Array.isArray(menuListdata)) {
        console.error("menuListdata is not an array:", menuListdata);
        return false;
    }

    return menuListdata.some(menu => {
        if (!Array.isArray(menu?.submenus)) {
            console.error("submenus is not an array for menu:", menu);
            return false;
        }

        // const hasSubMenu = menu.submenus.some((submenu:any) => submenu.menu_name === menuName);
        const hasSubMenu = menu?.submenus.some((submenu: any) => {
          // Check if either menu_name or menu.menu_name matches
          
          // return submenu?.menu_name?.toLowerCase() === menuName?.toLowerCase();
         
          const normalizedSubmenuName = submenu?.menu_name?.replace(/\s+/g, '').toLowerCase();
          const normalizedMenuName = menuName?.replace(/\s+/g, '').toLowerCase();
          return normalizedSubmenuName === normalizedMenuName;

      });
        // console.log(`Checking menu: ${menu.menu_name.toLowerCase()}, hasSubMenu: ${hasSubMenu} `);
        return hasSubMenu;
    });
};


export const dataaccess = (Menulist: any,lastSegment: any,urlcheck:any,datatest:any)=>{
  let filteredData = null;
    // console.log("tttt===",urlcheck?.urlcheck,datatest)
  JSON.parse(Menulist)?.forEach((data: any) => {
      if (data?.menu_name.toLowerCase() === lastSegment) {
          filteredData = data; // Found a match in the main menu
      } else {
          const result = data?.submenus?.find((menu: any) => menu?.menu_name.toLowerCase() === urlcheck?.urlcheck ? datatest?.datatest : menu?.menu_name.toLowerCase() === lastSegment);
          if (result) {
              // Found a match in the submenu
              filteredData = {
                  ...data,
                  submenus: [result] // Include only the matched submenu
              };
          }
      }
  });

  if (filteredData) {
      // setFilteredData(filteredData);
      return filteredData
      
  } else {
      
      // setFilteredData(null);
      return null
     
  }
}