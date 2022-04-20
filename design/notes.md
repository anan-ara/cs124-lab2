
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth.uid != null;
    }

    function isDocOwner() {
      return request.auth.uid == resource.data.owner;
    }

    function updatedDocHasCorrectOwner() {
      return request.auth.uid == request.resource.data.owner;
      // request.resource.data.owner: owner of data you're trying to update the doc with
      // can only update if I'm saying I'm the author of the new json object
    }

    function updatedDocHasSameOwner() {
      return resource.data.owner == request.resource.data.owner;
      // same person who made data has to be the one updating it
    }

    function updatedDocHasSameSharing() {
      return resource.data.sharedWith == request.resource.data.sharedWith;
      // Don't change the sharing permissions.
    }

    function isSharedWithMe() {
      return request.auth.token.email in resource.data.sharedWith;
    }

    match /People-NoAuthenticationNeeded/{person} {
        allow read, write: if request.time >u timestamp.date(2022, 6, 1);
    }

    match /People-AuthenticationRequired/{person} {
      allow read: if signedIn() && isDocOwner();
      allow create: if signedIn() && updatedDocHasCorrectOwner();
      allow update: if signedIn() && isDocOwner() &&
        updatedDocHasCorrectOwner();
      allow delete: if signedIn() && isDocOwner();
    }

    match /People-SharingAllowed/{person} {
      allow read: if signedIn() && isSharedWithMe();
      allow create: if signedIn() && updatedDocHasCorrectOwner();
      allow update: if signedIn() && isSharedWithMe() &&
        updatedDocHasSameOwner() && updateDocHasSameSharing();
      allow delete: if signedIn() && isDocOwner(); // can only delete own document
    }

  }
}


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
    - home level sorting
    - email (no password, password is just for authentication)
    - id
    - listPreferences: 
        {docId: preference, ...}
        - might have dangling listPreferences (eg. if you )
        - To get rid of dangling listPreferences, have a clean function that is called upon login to delete any dangling listPreferences.

 - can only see your own user document regardless of your permission level   
 - Can't sign up with same email but different account (2 users can't have same email)
    -  ask about how to avoid this!! (also look it up and see if it's just built-in)


- 


lists
- Each list has:
    - owner: user1Email
    - viewers: [user1Email, user2Email, ...]
        - can't access user IDs from frontend. We only know our UID. 
    - editors: [user1, user2, ...]
    - administrators: [user1, user2, ...]
    - ~~preferences: {userEmail: preference, ... }~~
    - creation date
    - name/text
    - # completed/# total
    - tasks: [task 1, ...]
        - remain as they are

## Where is sharing information stored?
 - each list item has sharing information assosiated with it
 - We want the lists to be the upper most thing not the users
- When querying lists, want to query all lists that we're an owner of or have sharing permissions for


# Past Questions: 
- ask if you can have a subcollection that just exists without the parent collection existing/if subcollections have an actual connection to the parent collection
- Do you need sharing info stored within each task
- More a naming convention

- If we store the sorting of each list in the database, where would this go?
    - if in users, then we have repeat info and have to update in both places which is annoying
    - if in lists, then do we have security issues with users being able to see how other users are sorting their lists?


# TODOS
- Fix error when deleting list in one window and viewing it in another (Lab 4 comments)
- Extra stuff:
  - change password
  - At end: fix database concurrency issues (race conditions), see Lab 4 comments from Prof. Rhodes

# Done
- Email verification: When user logs in, make sure that user verifies email (otherwise could sign up with an email that's not yours and get access to other ppl's shared lists)