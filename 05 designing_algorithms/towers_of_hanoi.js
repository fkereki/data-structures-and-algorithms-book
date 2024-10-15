const towers = (disks, origin, extra, destination) => {
  if (disks > 0) {
    towers(disks - 1, origin, destination, extra);
    console.log(`Move disk ${disks} from ${origin} to ${destination}`);
    towers(disks - 1, extra, origin, destination);
  }
};

towers(4, "A", "B", "C");

/*
Move disk 1 from A to B
Move disk 2 from A to C
Move disk 1 from B to C
Move disk 3 from A to B
Move disk 1 from C to A
Move disk 2 from C to B
Move disk 1 from A to B
Move disk 4 from A to C
Move disk 1 from B to C
Move disk 2 from B to A
Move disk 1 from C to A
Move disk 3 from B to C
Move disk 1 from A to B
Move disk 2 from A to C
Move disk 1 from B to C
*/
