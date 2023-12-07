import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPCSF20BXJ_qysy7MRnYpfwa08Yplo6sw",
    authDomain: "digital-blackboard-dhbw.firebaseapp.com",
    projectId: "digital-blackboard-dhbw",
    storageBucket: "digital-blackboard-dhbw.appspot.com",
    messagingSenderId: "354760127659",
    appId: "1:354760127659:web:1c3b9888bd88647a2fb3ee",
    measurementId: "G-F8VPDM77YE"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db};

import {collection, getDocs, addDoc, deleteDoc, doc, Timestamp} from 'firebase/firestore'

// All database operations regarding dual living page

export async function fetchAdsDualLiving() {
    const querySnapshot = await getDocs(collection(db, "dual-living"));

    // Convert the QueryDocumentSnapshots into an array of dictionaries
    const transformedData = querySnapshot.docs.map((doc) => {
        let tmp = doc.data();

        // Prepare data for displaying in card
        // assign document id as unique identifier for reading a specific advertisement
        tmp["id"] = doc.id;

        tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://media.discordapp.net/attachments/1097461286599659600/1181533190670798859/Kevkoo118_A_symbol_of_dual_living_two_small_houses_white_backgr_67b71827-9260-4cf5-a213-f1edce1b58ae.png?ex=65816788&is=656ef288&hm=156ff98ebc101b1aed749b45e1f09105d562462e696c4841ae9617be8b45eb27&=&width=1714&height=960"]

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

export async function createAdDualLiving(formData, images, contactData) {
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
        furniture: formData.furniture ? "Ja" : "Nein",
        community: formData.community ? "Ja" + formData.community_type : "Nein",
        community_type: formData.selectedGender,

        images: images,

        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,

        userId: 1,
    }

    // Store advertisement in database
    await addDoc(collection(db, "dual-living"), new_item);
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
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://media.discordapp.net/attachments/1097461286599659600/1181540706087612467/Kevkoo118_Students_celebrating_a_partytwhite_background_red_gre_56eda253-920d-488d-8d9b-87f7da47f1c9.png?ex=65816e88&is=656ef988&hm=bce22ece5f3172f67047fb1c9c1e239686cf61e01efcbbfa109232ace8e2af72&=&width=1714&height=960"]
        } else if (tmp["category"] === "Infos") {
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://media.discordapp.net/attachments/1097461286599659600/1181650618293686332/Kevkoo118_Ais_receiving_information_student_white_background_re_2f690c7c-7719-4805-9456-986f05102733.png?ex=6581d4e5&is=656f5fe5&hm=19b8d726f5ebab80ee7cff1b9d744c50dd71d8b2ae44d9e42fbf47a430c632ea&=&width=1642&height=920"]
        } else if (tmp["category"] === "Seminare") {
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://media.discordapp.net/attachments/1097461286599659600/1181649925302395011/Kevkoo118_students_listen_to_a_seminar_white_background_red_gre_ba29e608-8c8f-4c0b-afec-2f8ac6884f53.png?ex=6581d440&is=656f5f40&hm=964c1d3d799dddc4c029033cfe38e6d20b83ca84149190848a626bf282162d63&=&width=1642&height=920"]
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

export async function createAdEvents(images, eventData) {
    console.log(images, eventData)

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

    await addDoc(collection(db, "events-parties"), new_item);
}

export async function createAdInfo(images, infoData) {
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

    await addDoc(collection(db, "events-parties"), new_item);
}

export async function createAdSeminar(images, seminarData) {
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

    await addDoc(collection(db, "events-parties"), new_item);
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
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://media.discordapp.net/attachments/1097461286599659600/1181540596486258768/Kevkoo118_default_picture_for_dual_living_white_background_red__4ddb008d-6598-4f15-b97e-b150a008756f.png?ex=65816e6e&is=656ef96e&hm=47454a08ee50768dcf22730502a54e8afd373b9e482eee16f0adee307ec17f12&=&width=1714&height=960"]
        } else if (tmp["category"] === "group") {
            tmp["images"] = tmp["images"].length > 0 ? tmp["images"] : ["https://media.discordapp.net/attachments/1097461286599659600/1181651199024443483/Kevkoo118_A_group_of_students_are_learning_white_background_red_13ac0a81-fb88-4c8d-b2cc-9054bd41926c.png?ex=6581d56f&is=656f606f&hm=3182fc97187e3cc68a1905aacef8251f336f12a33d3826eb85442a5b0e3dc8c8&=&width=1642&height=920"]
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

export async function createAdStudyBuddy(buddyData, images, contactData) {
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

    await addDoc(collection(db, "study-hub"), new_item);
}

export async function createAdStudyGroup(hubData, images) {
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

    await addDoc(collection(db, "study-hub"), new_item);
}


// Database operations to delete advertisements

export async function deleteAd(collection, id) {
    await deleteDoc(doc(db, collection, id));
}