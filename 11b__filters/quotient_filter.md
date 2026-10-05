# STARTING

make me a diagram showing a quotient filter with 16 slots, showing slot, occ, cont, shift, and rem.

Values in the diagram should be:
for q=4: E, G, K, and L
for q=5: B and D
for q=7: C, F, and W
for q=15: U, Y, and Z

The filter should use wraparound.

slot 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
occ 0 0 0 0 1 1 0 1 0 0 0 0 0 0 0 1
cont 1 1 0 0 0 1 1 1 0 1 0 1 1 0 0 0
shift 1 1 0 0 0 1 1 1 1 1 1 1 1 0 0 0
rem Y Z . . E G K L B D C F W . . U
----] [ q=4 ---] [q=5] [ q=7 ] [q=15]

# Quotient filter: reading the 16-slot wraparound table

## The table

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   1   0   0   0   1   1   1   0   1   0   1   1   0   0   0
shift     1   1   0   0   0   1   1   1   1   1   1   1   1   0   0   0
rem       Y   Z   .   .   E   G   K   L   B   D   C   F   W   .   .   U
        q=15   ]         [     q=4     ] [ q=5 ] [   q=7   ]         [
```

---

## My question

So, tell me if this is all OK:

- we can first tell that there are no values for q=0,1,2,3,6,8,9,10,11,12,13, and 14 because their occ values are zero
- we can then tell that there are values (somewhere) for q=4, 5, 7, and 15 because their occ values are 1

WHERE ARE THE VALUES?

- for q=4 and 15, they start right there because the entries there have shift=0
- for q=5 and 7, they start elsewhere because the entries there have shift=1

WHERE IS EACH RUN?

- for q=4 it starts at 4 (cont=0) and go up to 7 while cont=1; at position 8 we have cont=0 so that's either an empty slot or the start of another run, but in any case the run for q=4 is ended. (In this case we know it's another run, because at position 8 we have shift=1; if we had shift=0 we would have ended the run, because all three bits would be 0.) We can tell what run it is because if we advance along occ starting at 4 we find occ=1 at 5, so that next run is for 5.

- for q=5 we already saw it started at 8, and it goes to 9 because at 10 we have cont=0. We could tell the run was elsewhere because G has shift=1 meaning it corresponds to a different, shifted run. The next run is for 7, because if we advance along occ starting at 5 we find occ=1 at 7; there's no run for q=6.

- for q=7 we do the same, and it starts at 10 and goes up to 12. We see that L has shift=1, so it's shifted and corresponds to a different run.

- for q=15 it starts at 15 (U has shift=0) and goes up to 1, wrapping around.

NOTE: If we have shift=0 and the entry is not empty, the run for that bucket starts right there.

### The step you skipped: finding the cluster start

You worked left to right from slot 4, which is correct, but the algorithm has to justify that anchor. To find bucket 5's run from scratch, you first walk left from slot 5 until you find `shift = 0`, which is slot 4. Only then do you pair buckets and runs going right. Otherwise you would not know that the first run you meet belongs to bucket 4.

For bucket 15 the walk-left step is trivial, because slot 15 already has `shift = 0`. For slot 0 or 1, it would walk left across the boundary (`0 → 15`) and stop at slot 15.

### Your reasoning, summarized

| Question                          | Answer from bits isCont                                            |
| --------------------------------- | ------------------------------------------------------------------ |
| Does bucket q have values?        | `occ[q]`                                                           |
| Where does its cluster start?     | Walk left until `shift = 0`                                        |
| Which run is it?                  | The k-th `occ = 1` bucket from the cluster start owns the k-th run |
| Where does the run start and end? | Starts at the k-th `cont = 0`, ends before the next `cont = 0`     |

Your analysis of the diagram follows exactly this procedure.

# ADDING VALUES

When we add values to existing runs, no occ values change.

If we added value T for q=14, we'd have occ=1 (because we now have a value for 14), shift=0 (because T goes at position 14), and shift=0 (because the run isn't shifted).

If we add a value for q=4, 5, or 7, we'd have to shift some values to the right.

- If the new value fits at the start of the run...

  - **New entry:** `cont = 0`, because it is now the first entry of the run.
    `shift = 0` if the run starts in its home slot (`pos == q`),
    otherwise `shift = 1`.
  - **Old first entry:** it is demoted, so `cont` changes from 0 to 1.
    Set this before the shift so the bit travels with the entry.
    Its `shift` becomes 1 because it moves one slot right, even if it
    was 0 before (it was sitting at home).
  - **Other old entries of the run:** `cont` stays 1, `shift` becomes 1.
  - **Entries of later runs, up to the first empty slot:** `cont` is
    unchanged (each run start keeps 0), `shift` becomes 1.
  - If the demotion is forgotten, two adjacent entries have `cont = 0`
    and the filter sees an extra run.

- If the new value fits at the middle of the run...

  - **New entry:** `cont = 1`, because it follows the first entry.
    `shift = 1` always, because it sits to the right of the run start,
    which is at or to the right of home.
  - **Old entries before the new one:** nothing changes.
  - **Old entries from the insertion point on:** `cont` is unchanged
    (they were all followers, so they stay 1), `shift` becomes 1.
  - **Entries of later runs, up to the first empty slot:** `cont` is
    unchanged, `shift` becomes 1.
  - No demotion: the first entry of the run stays the first.

- If the new value fits at the end of the run...

  - **New entry:** `cont = 1`, `shift = 1`, same as the middle case.
  - **Old entries of this run:** nothing changes.
  - The new entry lands in the slot just after the run, and there are
    two possibilities:
    - That slot is empty: nothing moves, and no old entry changes.
    - That slot holds the first entry of the next run: it moves right
      by one along with everything behind it, up to the first empty
      slot. Its `cont` stays 0 (it still starts its run), and its
      `shift` becomes 1.
  - No demotion.

- In all three cases...
  - `occ` never changes for an existing run and never moves with entries.
  - Every entry that moves gets `shift = 1`, including one that was at
    home (`shift = 0`) before.
  - `cont` always travels with its entry. The only existing `cont` bit
    that is ever rewritten is the demotion at the front of a run.
  - If the run did not exist yet, it is a new run: `occ[q]` becomes 1,
    the new entry gets `cont = 0` and `shift = (pos != q)`, and the entry
    that was at `pos` keeps its `cont` because it starts another run.

# LOGIC FOR SEARCHING

So, the logic for finding a value given q and r:

- you go to slot q
- if occ[q] is 0, there are no values for that q, so the value definitely isn't in the filter
- if occ[q] is 1, there is a run for q somewhere, but you have to find it.
- if shift[q] is 0 you are at the beginning of the run for q; otherwise you have to move left and then right until you find the beginning of the run for q
- once you are at the beginning of the run for q, you advance:

* if you go past the end of the run, r is not there; fail
* if you find r, it's success

```
lookup(q, r):
    if occ[q] == 0:                 return false
    start = q if shift[q] == 0
            else:  walk left while shift == 1 to cluster start,
                   then pair occupied buckets with runs up to q
    scan from start:
        if rem == r:                return true
        if rem > r:                 return false   (sorted, so stop early)
        move right; if cont == 0:   return false   (end of run)
```

# EXAMPLES FOR ADDING

I kept your original format and applied each example independently to the original table. A `*` after a value marks a cell that changed. The `cont` and `shift` bits of a slot can stay the same even when the element in it changes, so I call that out where it happens. Remainders are ordered alphabetically (A < B < ... < Z).

## Example 1: Unoccupied slot (baseline)

**Insert `A` at q=2.** Slot 2 is empty and has no run, so `A` goes straight into its canonical slot. It is the head of its run (`cont=0`) and is not displaced (`shift=0`). Nothing else moves.

**Changes needed:**

- `occ[2]`: 0 → 1
- `rem[2]`: empty → `A`
- `cont[2]` and `shift[2]` stay 0, which is correct for an element in its home slot.

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   1*  0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   1   0   0   0   1   1   1   0   1   0   1   1   0   0   0
shift     1   1   0   0   0   1   1   1   1   1   1   1   1   0   0   0
rem       Y   Z   A*  .   E   G   K   L   B   D   C   F   W   .   .   U
```

## Example 2: New run in a slot occupied by another quotient's element

**Insert `H` at q=6.** Slot 6 holds `K`, which belongs to q=4, but q=6 has no run yet. So `occ[6]` is set, and a new run must be created in quotient order, between the q=5 run (ending at slot 9) and the q=7 run (starting at slot 10). `H` takes slot 10, and the q=7 run (`C`, `F`, `W`) shifts one slot right into slots 11, 12 and 13.

**Changes needed:**

- `occ[6]`: 0 → 1. Note that the bit is set in slot 6, but `H` is stored in slot 10.
- `H` is placed in slot 10 as a run head (`cont=0`) and displaced (`shift=1`).
- `C`, `F`, `W` move to slots 11, 12, 13, so `rem` changes in all four slots.
- `cont[11]`: 1 → 0, because `C` is the head of its run and now sits where `F` used to be.
- Slot 13 was empty, so `cont[13]` and `shift[13]` become 1 for `W`.
- `cont[10]`, `shift[10..12]` keep their old values.

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   1*  1   0   0   0   0   0   0   0   1
cont      1   1   0   0   0   1   1   1   0   1   0   0*  1   1*  0   0
shift     1   1   0   0   0   1   1   1   1   1   1   1   1   1*  0   0
rem       Y   Z   .   .   E   G   K   L   B   D   H*  C*  F*  W*  .   U
```

## Example 3: Head of a run in the middle of a cluster

**Insert `A` at q=5.** The q=5 run already exists (`occ[5]=1`), so no occupancy bit changes. To find it, start at the cluster start (slot 4) and count the `occ` bits up to q=5 (slots 4 and 5, so it's the 2nd run). Then skip to the 2nd run head, which is slot 8 (the second `cont=0` slot in the cluster). `A` sorts before `B`, so it takes slot 8, and `B`, `D`, `C`, `F`, `W` all shift one slot right.

**Changes needed:**

- `A` goes into slot 8 as run head (`cont=0`) and displaced (`shift=1`, since its home is slot 5).
- `B` is now a continuation in slot 9. Its `cont` is 1, but `cont[9]` was already 1 (it held `D`), so the array value doesn't change. The head bit stays in slot 8 and the new continuation takes over the old continuation bit.
- `D` moves to slot 10, so `cont[10]`: 0 → 1.
- `C` moves to slot 11 as head of the q=7 run, so `cont[11]`: 1 → 0.
- `F` moves to slot 12 (`cont` stays 1).
- `W` moves to slot 13, which was empty, so `cont[13]` and `shift[13]` become 1.
- `rem` changes in slots 8 to 13.

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   1   0   0   0   1   1   1   0   1   1*  0*  1   1*  0   0
shift     1   1   0   0   0   1   1   1   1   1   1   1   1   1*  0   0
rem       Y   Z   .   .   E   G   K   L   A*  B*  D*  C*  F*  W*  .   U
```

## Example 4: Middle of a run, wrapping around the table

**Insert `V` at q=15.** The q=15 run is `U` (slot 15), `Y` (slot 0), `Z` (slot 1). `V` sorts between `U` and `Y`, so it goes right after `U`, in slot 0. `Y` and `Z` shift one slot right, into slots 1 and 2. Since the table is circular, the shift crosses the boundary from slot 15 to slot 0.

**Changes needed:**

- `occ` is unchanged (`occ[15]` is already 1).
- `U` doesn't move, so slot 15 is untouched.
- `V` goes into slot 0 as a continuation (`cont=1`) and displaced (`shift=1`). Both bits already had these values, so only `rem[0]` changes.
- `Y` moves to slot 1 and `Z` to slot 2. Slot 1's bits are unchanged, and `rem` changes.
- Slot 2 was empty, so `cont[2]` and `shift[2]` become 1, and `rem[2]` becomes `Z`.

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   1   1*  0   0   1   1   1   0   1   0   1   1   0   0   0
shift     1   1   1*  0   0   1   1   1   1   1   1   1   1   0   0   0
rem       V*  Y*  Z*  .   E   G   K   L   B   D   C   F   W   .   .   U
```

## What each example shows

| Example | Main lesson                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1       | No collision, so only `occ` and `rem` change.                                                                                   |
| 2       | `occ` position and element position are independent. A new run goes after the earlier quotients' runs.                          |
| 3       | Finding a run mid-cluster requires counting `occ` bits and run heads. Metadata bits stay with the slot while the elements move. |
| 4       | The shift wraps around the table, and the head of the run doesn't move.                                                         |

# EXAMPLES FOR REMOVING

I applied each removal independently to the original table. A `*` marks a cell whose value changed. An emptied slot is shown as `.` in `rem` with `cont` and `shift` set to 0. Removal mirrors insertion: the elements behind the removed one shift **left** to close the gap, and `occ[q]` is cleared only if the run becomes empty.

Original table:

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   1   0   0   0   1   1   1   0   1   0   1   1   0   0   0
shift     1   1   0   0   0   1   1   1   1   1   1   1   1   0   0   0
rem       Y   Z   .   .   E   G   K   L   B   D   C   F   W   .   .   U
        q=15   ]         [     q=4     ] [ q=5 ] [   q=7   ]         [
```

## Example 1: Last element of a run, at the end of a cluster

**Remove `W` (q=7).** `W` is the last element of the q=7 run and also the last one in its cluster, so nothing sits behind it and nothing moves. Its slot is emptied. `occ[7]` stays 1 because `C` and `F` remain. This is the baseline case.

**Changes needed:**

- `rem[12]`: `W` → empty
- `cont[12]`: 1 → 0
- `shift[12]`: 1 → 0
- `occ` doesn't change.

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   1   0   0   0   1   1   1   0   1   0   1   0*  0   0   0
shift     1   1   0   0   0   1   1   1   1   1   1   1   0*  0   0   0
rem       Y   Z   .   .   E   G   K   L   B   D   C   F   .*  .   .   U
```

## Example 2: Middle of a run, with a cascade behind it

**Remove `G` (q=4).** `G` is in slot 5, in the middle of the q=4 run (`E`, `G`, `K`, `L`). The run becomes `E`, `K`, `L`. Everything behind `G` moves one slot left, including the q=5 and q=7 runs, and the last slot of the cluster (slot 12) is emptied. `occ` doesn't change.

**Changes needed:**

- `K` and `L` move to slots 5 and 6. They are continuations before and after, so their bits don't change.
- `B` moves to slot 7. It is the head of the q=5 run, so `cont[7]`: 1 → 0.
- `D` moves to slot 8, so `cont[8]`: 0 → 1.
- `C` moves to slot 9. It is the head of the q=7 run, so `cont[9]`: 1 → 0.
- `F` moves to slot 10, so `cont[10]`: 0 → 1.
- `W` moves to slot 11 (`cont` stays 1).
- Slot 12 is emptied: `cont[12]`: 1 → 0, `shift[12]`: 1 → 0.
- `rem` changes in slots 5 to 12.
- `shift` is unchanged in slots 5 to 11, because every moved element still sits away from its canonical slot.

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   1   0   0   0   1   1   0*  1*  0*  1*  1   0*  0   0   0
shift     1   1   0   0   0   1   1   1   1   1   1   1   0*  0   0   0
rem       Y   Z   .   .   E   K*  L*  B*  D*  C*  F*  W*  .*  .   .   U
```

## Example 3: Head of a run in the middle of a cluster

**Remove `B` (q=5).** `B` is the head of the q=5 run, in slot 8. `D` becomes the new head and moves into slot 8, still displaced from its canonical slot 5. The q=7 run (`C`, `F`, `W`) follows one slot left, and slot 12 is emptied. `occ[5]` stays 1 because `D` remains.

**Changes needed:**

- `D` moves to slot 8 as the new run head. `cont[8]` is already 0, so the array value doesn't change, and `shift[8]` stays 1.
- `C` moves to slot 9 as head of the q=7 run, so `cont[9]`: 1 → 0.
- `F` moves to slot 10, so `cont[10]`: 0 → 1.
- `W` moves to slot 11 (`cont` stays 1).
- Slot 12 is emptied: `cont[12]`: 1 → 0, `shift[12]`: 1 → 0.
- `rem` changes in slots 8 to 12.
- `occ` doesn't change.

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   1   0   0   0   1   1   1   0   0*  1*  1   0*  0   0   0
shift     1   1   0   0   0   1   1   1   1   1   1   1   0*  0   0   0
rem       Y   Z   .   .   E   G   K   L   D*  C*  F*  W*  .*  .   .   U
```

## Example 4: Head of a run at the start of a cluster, with wrap-around

**Remove `U` (q=15).** The q=15 run is `U` (slot 15), `Y` (slot 0), `Z` (slot 1). `U` is the head. After removal `Y` becomes the head and moves back into its canonical slot 15, where it is no longer displaced. `Z` moves from slot 1 to slot 0, and slot 1 is emptied. The left shift crosses the boundary from slot 0 to slot 15. `occ[15]` stays 1.

**Changes needed:**

- `Y` moves to slot 15 as the new head. The slot's bits were already `cont=0, shift=0`, so only `rem[15]` changes. This is the only case where a surviving element returns to its home slot.
- `Z` moves to slot 0. The slot's bits were already `cont=1, shift=1`, so only `rem[0]` changes.
- Slot 1 is emptied: `cont[1]`: 1 → 0, `shift[1]`: 1 → 0, `rem[1]` → empty.
- `occ` doesn't change.

```
slot      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
occ       0   0   0   0   1   1   0   1   0   0   0   0   0   0   0   1
cont      1   0*  0   0   0   1   1   1   0   1   0   1   1   0   0   0
shift     1   0*  0   0   0   1   1   1   1   1   1   1   1   0   0   0
rem       Z*  .*  .   .   E   G   K   L   B   D   C   F   W   .   .   Y*
```

## Example 5: Only element of a run, so the run disappears

This is the opposite of addition example 1. Removing the only element of a run empties the run, so `occ[q]` is cleared, and that is the one case where `occ` changes in a removal. If the element sits in its canonical slot with nothing behind it, as with `A` at q=2 from addition example 1, undoing the insertion clears `occ[2]` and `rem[2]` and nothing else changes.

If the run is inside a cluster, the elements behind it also shift left. For example, starting from the table after addition example 2 and removing `H` (q=6), `occ[6]` is cleared in slot 6, while `H` leaves slot 10 and the q=7 run shifts back one slot left. This shows once more that the `occ` bit and the element's location are independent.

No table is shown, because no run in the original table has a single element.

## What each example shows

| Example | Main lesson                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1       | Last element of a run at the end of a cluster: only that slot is emptied.                                              |
| 2       | Middle removal: everything behind shifts left, and run boundaries (`cont` bits) move even though no head was removed.  |
| 3       | Head removal mid-cluster: the next element becomes the head and keeps its displaced status.                            |
| 4       | Head removal at a cluster start: the next element returns to its home slot, and the left shift wraps around the table. |
| 5       | Only element of a run: `occ[q]` is cleared.                                                                            |
