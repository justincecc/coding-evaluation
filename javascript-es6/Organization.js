class Organization {
  constructor(root) {
    this.printOrganization = (position, prefix) => {
      let str = `${prefix}+-${position.toString()}\n`;
      for (const p of position.getDirectReports()) {
        str = str.concat(this.printOrganization(p, `${prefix}  `));
      }
      return str;
    };

    // Helper funciton that will be recurssively called if role has not been found
    this.recurssiveHire = (person, title, rootPtr) => {
      // Intializing the local root for this call
      const copyRoot = rootPtr;
      const currentPosition = copyRoot.getTitle();
      
      // Checking to see if we have the current title in our role 
      if (title === currentPosition) return copyRoot.setEmployee(person.toString());

      // Getting 
      const currentDirectReports = copyRoot.getDirectReports();

      // Looping through the current roles direct reports
      for (let directoryIdx = 0; directoryIdx < currentDirectReports.length; directoryIdx++) {
        const loopRole = currentDirectReports[directoryIdx];
        const loopTitle = loopRole.getTitle();

        // Checking to see if current looped title is the one we are looking for
        if (loopTitle === title) return loopRole.setEmployee(person.toString());

        //If not we call the function to run on the current loop role
        this.recurssiveHire(person, title, loopRole);
      }
    };

    // Hire the given person as an employee in the position that has that title
    // Return the newly filled position or undefined if no position has that title
    this.hire = (person, title) => {
      return this.recurssiveHire(person, title, root);
    };

    // This was my first pass through the problem. Using a more straightforward approach using regular
    // for loops to understand how the looping would need to work for this problem this approach also worked

    // this.hire = (person, title) => {
    //   const highestPosition = root.getTitle();
    //   if (title === highestPosition) return root.setEmployee(person.toString());
    //   const currentDirectReports = root.getDirectReports();
    //   for (let firstLevelIdx = 0; firstLevelIdx < currentDirectReports.length; firstLevelIdx++) {
    //     const currentRole = currentDirectReports[firstLevelIdx];
    //     const currentTitle = currentRole.getTitle();
    //     if (title === currentTitle) return currentRole.setEmployee(person.toString());
    //     const firstDirectReports = currentRole.getDirectReports();
    //     for (let secondLevelIdx = 0; secondLevelIdx < firstDirectReports.length; secondLevelIdx++) {
    //       const secondLevelRole = firstDirectReports[secondLevelIdx];
    //       const secondLevelTitle = secondLevelRole.getTitle();
    //       if (title === secondLevelTitle) return secondLevelRole.setEmployee(person.toString());
    //       const secondLevelDirectReports = secondLevelRole.getDirectReports();
    //       for (let thirdLevelIdx = 0; thirdLevelIdx < secondLevelDirectReports.length; thirdLevelIdx++) {
    //         const thirdLevelRole = secondLevelDirectReports[thirdLevelIdx];
    //         const thirdLevelTitle = thirdLevelRole.getTitle();
    //         if (title === thirdLevelTitle) return thirdLevelRole.setEmployee(person.toString());
    //       }
    //     }
    //   }
    // };

    this.toString = () => this.printOrganization(root, '');
  };
}

export default Organization;
