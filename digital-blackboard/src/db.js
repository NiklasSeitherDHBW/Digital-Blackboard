import {initializeApp} from 'firebase/app'
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, Timestamp} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPCSF20BXJ_qysy7MRnYpfwa08Yplo6sw",
    authDomain: "digital-blackboard-dhbw.firebaseapp.com",
    projectId: "digital-blackboard-dhbw",
    storageBucket: "digital-blackboard-dhbw.appspot.com",
    messagingSenderId: "354760127659",
    appId: "1:354760127659:web:1c3b9888bd88647a2fb3ee",
    measurementId: "G-F8VPDM77YE",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db};


// All database operations regarding dual living page

export async function fetchAdsDualLiving() {
    const querySnapshot = await getDocs(collection(db, "dual-living"));

    // Convert the QueryDocumentSnapshots into an array of dictionaries
    const transformedData = querySnapshot.docs.map((doc) => {
        let tmp = doc.data();

        // Prepare data for displaying in card
        // assign document id as unique identifier for reading a specific advertisement
        tmp["id"] = doc.id;

        tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/default-images%2Fdefault-image-dualliving.png?alt=media&token=087bce5b-85d8-469c-be7d-7f96e5f7d386"]

        // Display dates in format TT.MM.YYYY
        tmp["date_created"] = new Date(tmp["date_created"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tmp["available_from"] = new Date(tmp["available_from"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tmp["available_until"] = new Date(tmp["available_until"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tmp["availability"] = tmp["available_from"] + " - " + tmp["available_until"];

        tmp["furniture"] = tmp["furniture"] ? "Ja" : "Nein";
        tmp["community"] = tmp["community"] ? "Ja - " + tmp["community_type"] : "Nein";

        tmp["adType"] = "dualLiving";

        return tmp;
    });

    return transformedData;
}

export function createDualLivingAdItem(formData, images, contactData) {
    // Split date by every component to create a date object for firebase
    let fromParts = formData.availableFrom.split("-")
    let untilParts = formData.availableTill.split("-")

    // Create new document
    let new_item = {
        title: formData.title,
        date_created: Timestamp.fromDate(new Date()),

        available_from: Timestamp.fromDate(new Date(fromParts[0], fromParts[1] - 1, fromParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        available_until: Timestamp.fromDate(new Date(untilParts[0], untilParts[1] - 1, untilParts[2])),

        area: formData.area || "keine Angabe",
        rooms: formData.rooms || "keine Angabe",
        price: formData.price || "keine Angabe",

        description: formData.description || "keine Angabe",
        location: formData.location || "keine Angabe",
        furniture: formData.furniture,
        community: formData.community,
        community_type: formData.selectedGender,

        images: images,

        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,

        userId: 1,
    }

    return new_item;
}


export async function createAdDualLiving(formData, images, contactData) {
    let new_item = createDualLivingAdItem(formData, images, contactData)

    // Store advertisement in database
    await addDoc(collection(db, "dual-living"), new_item);
}

export async function editAdDualLiving(id, formData, images, contactData) {
    // Split date by every component to create a date object for firebase
    let fromParts = formData.availableFrom.split("-")
    let untilParts = formData.availableTill.split("-")

    // Create new document
    let new_item = {
        title: formData.title,
        date_created: Timestamp.fromDate(new Date()),

        available_from: Timestamp.fromDate(new Date(fromParts[0], fromParts[1] - 1, fromParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        available_until: Timestamp.fromDate(new Date(untilParts[0], untilParts[1] - 1, untilParts[2])),

        area: formData.area,
        rooms: formData.rooms,
        price: formData.price,

        description: formData.description,
        location: formData.location,
        furniture: formData.furniture,
        community: formData.community,
        community_type: formData.community ? formData.selectedGender : "",

        images: images,

        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,

        userId: 1,
    }

    await setDoc(doc(db, "dual-living", id), new_item)
}


// All database operations regarding events, infos and workshops page

export async function fetchAdsEventsInfos() {
    const querySnapshot = await getDocs(collection(db, "events-parties"));



    // Convert the QueryDocumentSnapshots into an array of dictionaries
    const transformedData = querySnapshot.docs.map((doc) => {
        let tmp = doc.data();

        // Prepare data for displaying in card
        // assign document id as unique identifier for reading a specific advertisement
        tmp["id"] = doc.id;

        if (tmp["category"] === "Events") {
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/default-images%2Fdefault-iamge-events.png?alt=media&token=ca0534ab-8598-4f12-95ec-01422381ddff"]
        } else if (tmp["category"] === "Infos") {
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/default-images%2Fdefault-image-information.png?alt=media&token=5a4eca73-8da5-4fc0-b0d4-acceba424b2b"]
        } else if (tmp["category"] === "Seminare") {
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/default-images%2Fdefault-iamge-seminars.png?alt=media&token=0ed98193-b065-43cd-a401-89958a9a2bcd"]
        }

        // Display dates in format TT.MM.YYYY
        tmp["date_created"] = new Date(tmp["date_created"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tmp["date"] = new Date(tmp["date"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        tmp["availability"] = tmp["members"] + " / " + tmp["max_participants_limit"];

        tmp["adType"] = "events";

        return tmp;
    });

    return transformedData;
}

//// Events
export function createEventsAdItem(images, eventData) {
    // Split date by every component to create a date object for firebase
    let dateParts = eventData.date.split("-")

    let new_item = {
        images: images,

        title: eventData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        price: eventData.price || "keine Angabe",
        community: eventData.community || "keine Angabe",

        description: eventData.description || "keine Angabe",
        location: eventData.location || "keine Angabe",
        members: 0,
        max_participants_limit: eventData.maxParticipantsLimit || "keine Angabe",

        category: eventData.category,

        likes: 0,

        userId: 1,
    }

    return new_item
}

export async function createAdEvents(images, eventData) {
    let new_item = createEventsAdItem(images, eventData)

    await addDoc(collection(db, "events-parties"), new_item);
}

export async function editAdEvents(id, images, eventData) {
    // Split date by every component to create a date object for firebase
    let dateParts = eventData.date.split("-")

    let new_item = {
        images: images,

        title: eventData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        price: eventData.price,
        community: eventData.community,

        description: eventData.description,
        location: eventData.location,
        members: eventData.members,
        max_participants_limit: eventData.maxParticipantsLimit,

        category: eventData.category,

        likes: eventData.likes,
        liked: eventData.liked,

        userId: 1,
    }

    await setDoc(doc(db, "events-parties", id), new_item)
}


//// Infos
export function createInfoAdItem(images, infoData) {
    let dateParts = infoData.date.split("-")

    let new_item = {
        images: images,

        title: infoData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        community: infoData.community || "keine Angabe",

        description: infoData.description || "keine Angabe",
        location: infoData.location || "keine Angabe",

        category: infoData.category,

        userId: 1,
    }

    return new_item
}

export async function createAdInfo(images, infoData) {
    let new_item = createInfoAdItem(images, infoData)

    await addDoc(collection(db, "events-parties"), new_item);
}

export async function editAdInfo(id, images, infoData) {
    let dateParts = infoData.date.split(".")

    let new_item = {
        images: images,

        title: infoData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        community: infoData.community,

        description: infoData.description,
        location: infoData.location,

        category: infoData.category,

        userId: 1,
    }

    await setDoc(doc(db, "events-parties", id), new_item)
}

/// Seminar
export function createSeminarAdItem(images, seminarData) {
    let dateParts = seminarData.date.split("-")

    let new_item = {
        images: images,

        title: seminarData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        price: seminarData.price || "keine Angabe",
        community: seminarData.community || "keine Angabe",

        description: seminarData.description || "keine Angabe",
        location: seminarData.location || "keine Angabe",

        members: 0,
        max_participants_limit: seminarData.maxParticipantsLimit || "keine Angabe",

        category: seminarData.category,

        likes: 0,
        userId: 1
    }

    return new_item;
}

export async function createAdSeminar(images, seminarData) {
    let new_item = createSeminarAdItem(images, seminarData)

    await addDoc(collection(db, "events-parties"), new_item);
}

export async function editAdSeminar(id, images, seminarData) {
    console.log(seminarData)

    let dateParts = seminarData.date.split("-")

    let new_item = {
        images: images,

        title: seminarData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        price: seminarData.price || "keine Angabe",
        community: seminarData.community || "keine Angabe",

        description: seminarData.description || "keine Angabe",
        location: seminarData.location || "keine Angabe",

        members: seminarData.members,
        max_participants_limit: seminarData.maxParticipantsLimit,

        category: seminarData.category,

        likes: seminarData.likes,
        liked: seminarData.liked,

        userId: 1
    }

    await setDoc(doc(db, "events-parties", id), new_item)
}


// All database operations regarding study hub page

export async function fetchAdsStudyHub() {
    const querySnapshot = await getDocs(collection(db, "study-hub"));

    // Convert the QueryDocumentSnapshots into an array of dictionaries
    const transformedData = querySnapshot.docs.map((doc) => {
        let tmp = doc.data();

        // Prepare data for displaying in card
        // assign document id as unique identifier for reading a specific advertisement
        tmp["id"] = doc.id;

        if (tmp["category"] === "buddy") {
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/default-images%2Fdefault-iamge-studybuddy.png?alt=media&token=9322e40e-78e5-43a2-b6d5-c358f8ce0943"]
        } else if (tmp["category"] === "group") {
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/default-images%2Fdefault-iamge-studygroup.png?alt=media&token=75e57545-8f8f-4836-b9f5-1b6eb38d90fd"]
        }
        // Display dates in format TT.MM.YYYY
        tmp["date_created"] = new Date(tmp["date_created"].seconds * 1000).toLocaleDateString("de-DE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        tmp["adType"] = "studyHub"

        return tmp;
    });

    return transformedData
}

//// StudyBuddy
export function createStudyBuddyAdItem(buddyData, images, contactData) {
    let new_item = {
        images: images,

        title: buddyData.title,
        date_created: Timestamp.fromDate(new Date()),

        price: buddyData.price || "keine Angabe",
        subject: buddyData.subject || "keine Angabe",

        description: buddyData.description || "keine Angabe",
        availability: buddyData.availability || "keine Angabe",

        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,

        category: buddyData.category,
        categories: "Nachhilfe",

        userId: 1,
    }

    return new_item
}

export async function createAdStudyBuddy(buddyData, images, contactData) {
    let new_item = createStudyBuddyAdItem(buddyData, images, contactData)

    await addDoc(collection(db, "study-hub"), new_item);
}

export async function editAdStudyBuddy(id, buddyData, images, contactData) {
    let new_item = {
        images: images,

        title: buddyData.title,
        date_created: Timestamp.fromDate(new Date()),

        price: buddyData.price,
        subject: buddyData.subject,

        description: buddyData.description,
        availability: buddyData.availability,

        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,

        category: buddyData.category,
        categories: "Nachhilfe",

        rating: buddyData.rating,

        userId: 1,
    }

    await setDoc(doc(db, "study-hub", id), new_item)
}

//// StudyGroup
export function createStudyGroupItem(hubData, images) {
    let new_item = {
        images: images,

        title: hubData.title,
        date_created: Timestamp.fromDate(new Date()),

        subject: hubData.subject || "keine Angabe",
        members: hubData.members,

        description: hubData.description || "keine Angabe",
        activities: hubData.activities || "keine Angabe",

        joined: hubData.joined,
        category: "group",
        categories: "Gruppe",

        userId: 1,
    }

    return new_item
}

export async function createAdStudyGroup(hubData, images) {
    let new_item = createStudyGroupItem(hubData, images);

    await addDoc(collection(db, "study-hub"), new_item);
}

export async function editAdStudyGroup(id, hubData, images) {
    let new_item = {
        images: images,

        title: hubData.title,
        date_created: Timestamp.fromDate(new Date()),

        subject: hubData.subject,
        members: hubData.members,

        description: hubData.description,
        activities: hubData.activities,

        joined: hubData.joined,
        category: "group",
        categories: "Gruppe",

        userId: 1,
    }

    await setDoc(doc(db, "study-hub", id), new_item)
}


// Database operations to delete advertisements

export async function deleteAd(collection, id) {
    await deleteDoc(doc(db, collection, id));
}