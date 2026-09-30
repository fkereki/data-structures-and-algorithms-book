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
         ----wrap----          [--- q=4 ---][q=5][ q=7  ]         [q=15]
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
