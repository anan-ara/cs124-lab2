

# General Notes:
- Would be nice if we have multiple leves of authorization like google docs
    - view (read), edit (read + update), edit + delete (read + update + delete tasks + share + delete list)
    - Default one -- view
- Only need sharing for sharing of lists, not sharing of individual tasks

# From the lab instructions

If user A shares a list with user B, can user B share that list with user C?
depends (see above)
If user A shares a list with user B, can user B delete that list?
depends (see above)
***If user A shares a list with user B, does user B need to accept that sharing, or will a shared list just show up?
yes. 
Should shared lists be distinguishable in the UI from unshared lists?
yes
- If it's shared with other people:
    - have people icons that say it's shared with other people
- If you're not the owner and it's shared with you
    - Have a section "My shared lists" OR just show it all in one screen and have indicator that it's not your list and is rather shared with you (see screenshots)

If user A shares a list with user B, can user B see that list if they don't have a verified email address?
- No



# Firestore collection structure

users
- Each user has:
    - low priority emoji
    - med ""
    - high ""
    - home level sorting ("sort")
    - email (no password, password is just for authentication)
    - id
    - listPreferences: 
        {docId: preference, ...}
        - might have dangling listPreferences (eg. if you )
        - To get rid of dangling listPreferences, have a clean function that is called upon login to delete any dangling listPreferences. (TODO LATER)

 - can only see your own user document regardless of your permission level   



lists
- Each list has:
    - owner: user1Email
    - viewers: [user1Email, user2Email, ...]
        - can't access user IDs from frontend. We only know our UID. 
    - editors: [user1, user2, ...]
    - admins: [user1, user2, ...]
    - ~~preferences: {userEmail: preference, ... }~~
    - creation date
    - name/text
    - # completed/# total
    - tasks: [task 1, ...]
        - remain as they are

- keep: complete, total, created, id, text
- get rid of later: sort
- add: everything above ^ (everything about ppl)

## Where is sharing information stored?
 - each list item has sharing information assosiated with it
 - We want the lists to be the upper most thing not the users
- When querying lists, want to query all lists that we're an owner of or have sharing permissions for


# Notes May 1:
- plan: do 4 indices, do filtering on front end


# Past Questions: 
- How does the database know what auth is when we just use useCollectionData (i.e. how is the auth attatched to the request if we don't pass it into useCollectionData?) 
    - firebase firestore library supports setting up, when you sign in it automatically sends this to the database along with request to the server. If you signed in, it sends the auth.
- How do we actually do the create user call? (Rn we do a useEffect)
    - useDocument or useDocumentData call in signed in app to go get it. If there's an error, then 
    - useCollection data, if it's an empty response, then create the document. i.e. try to get it, if it's not there, then create it. 
- in vs. arrayContains
    - how this works with indexes. What does it mean to have an index for an arrayContains where clause?
    - Prof. Rhodes' conjecture: Creates an index on the values in the array. Each of the different unique values will be sorted contiguously. (it would be a dictionary, keys are the things you're trying to find in the array, value is all the docs for which the key is in that array)
    - in: you have a field that is not an array. in: country has one of three values, (eg. us, canada, mexico)
- In general, how do we know what to do on front-end and back-end? Eg. filtering based on checked?
    - OK with front-end sorting?
    - Our current thoughts: Sorting on backend, filtering on front end. (Because you always have a default sort, but not always a filter)
    - Depends how big everything is. For sorting, if doing something huge: eg. facebook infinite scroll, wouldn't want to get all the documents in memory and then sort them. we'd want to do queries and then get batches. In our case, locally is fine for sorting. 
    - Filtering: eg. checked/unchecked. You can do either way. 
    - However we're doing it, continue to do it that way, may find that we need a new compound index. 
- Anan's Q: Correctness check for total/completed fields in list doc?
    - i.e. we have to still let them update it somehow. How do we make sure that it correpsonds to the actual number of total/completed in the task subcollection?
    - Prof. Rhodes: It's shared with them, so it's not a large concern. Plus you can easily have self correcting code for that. 
    - Race conditions
        - increment/decrement 
        - simplest might be-- whenever you go to tasks for list, count them and if it's wrong, then fix it.
- How to get to the answers later on when we are in the industry and don't have a prof to explain everything to us?
    - How do we know the hacky from the non-hacky
    - look at other people's code, ask questions on stack overflow, code reviews will ideally tell you if your code is idiomatic or not in industry.

- ask if you can have a subcollection that just exists without the parent collection existing/if subcollections have an actual connection to the parent collection
- Do you need sharing info stored within each task
- More a naming convention
- If we store the sorting of each list in the database, where would this go?
    - if in users, then we have repeat info and have to update in both places which is annoying
    - if in lists, then do we have security issues with users being able to see how other users are sorting their lists?
 - Can't sign up with same email but different account (2 users can't have same email)
    -  ask about how to avoid this!! (also look it up and see if it's just built-in)
      - built in (firebase takes care of it)


# TODOS
- Fix error when deleting list in one window and viewing it in another (Lab 4 comments)
- Extra stuff:
  - change password
  - At end: fix database concurrency issues (race conditions), see Lab 4 comments from Prof. Rhodes
- Figure out if need email in users document

TODO on own 
  - UI planning
  - some minor old bugs
  - redux

# Done
- Email verification: When user logs in, make sure that user verifies email (otherwise could sign up with an email that's not yours and get access to other ppl's shared lists)