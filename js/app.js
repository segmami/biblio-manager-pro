// =========================
// 1. VARIABLES GLOBALES
// =========================

let database = [];
let currentId = 0;
const STORAGE_KEY = "biblio_db_final";


// =========================
// 2. CHARGEMENT DES DONNÉES
// =========================

const loadDatabase = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            database = JSON.parse(stored);
            if (Array.isArray(database) && database.length > 0) {
                currentId = database[database.length - 1].id;
            }
        } catch (e) {
            console.error("Erreur JSON:", e);
            database = [];
        }
    }
    renderTable();
};


// =========================
// 3. VALIDATION
// =========================

const validateBookForm = (title, author, isbn) => {
    if (!title.trim()) {
        showMessage("Erreur : Le titre est obligatoire.");
        return false;
    }

    if (!author.trim()) {
        showMessage("Erreur : L'auteur est obligatoire.");
        return false;
    }

    if (isbn.trim().length < 4) {
        showMessage("Erreur : L'ISBN doit contenir au moins 4 caractères.");
        return false;
    }

    return true;
};


// =========================
// 4. AJOUT D’UN LIVRE
// =========================

const addBook = () => {
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const isbn = document.getElementById("isbnInput").value;
    const categoryValue = document.getElementById("categorySelect").value;

    if (!validateBookForm(title, author, isbn)) {
        return; // message déjà envoyé par validateBookForm()
    }

    currentId++;

    const categoryMap = {
        "1": "Science-Fiction",
        "2": "Documentaire",
        "3": "Roman"
    };

    const newBook = {
        id: currentId,
        title,
        author,
        category: categoryMap[categoryValue],
        details: `${isbn} | ${new Date().toLocaleDateString()}`,
        deleted: false
    };

    database.push(newBook);
    saveDatabase();
    renderTable();
    showMessage("Livre ajouté !");

    // vider les champs
    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("isbnInput").value = "";
};


// =========================
// 5. AFFICHAGE
// =========================

const renderTable = () => {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    let count = 0;

    database.forEach(book => {
        if (!book.deleted) {
            count++;

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>#${book.id}</td>
                <td><b>${book.title.toUpperCase()}</b><br><i>${book.author}</i></td>
                <td>${book.category}</td>
                <td>${book.details}</td>
                <td><button class="delete-btn" data-id="${book.id}">X</button></td>
            `;

            tbody.appendChild(row);
        }
    });

    document.getElementById("counter").textContent = count;
};


// =========================
// 6. SUPPRESSION
// =========================

const deleteBook = (id) => {
    database = database.map(book =>
        book.id == id ? { ...book, deleted: true } : book
    );
    saveDatabase();
    renderTable();
};


// =========================
// 7. SAUVEGARDE
// =========================

const saveDatabase = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
};


// =========================
// 8. MESSAGES UTILISATEUR
// =========================

const showMessage = (msg) => {
    const messageBox = document.getElementById("message");
    messageBox.textContent = msg;
    setTimeout(() => {
        messageBox.textContent = "";
    }, 3000);
};


// =========================
// 9. RECHERCHE
// =========================

const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(keyword) ? "" : "none";
    });
};


// =========================
// 10. DOM READY
// =========================

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("saveButton").addEventListener("click", addBook);

    document.getElementById("resetButton").addEventListener("click", () => {
        localStorage.removeItem(STORAGE_KEY);
        database = [];
        currentId = 0;
        renderTable();
        showMessage("Base réinitialisée.");
    });

    document.getElementById("tableBody").addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            deleteBook(e.target.dataset.id);
        }
    });

    document.getElementById("searchInput").addEventListener("keyup", handleSearch);

    loadDatabase();
});
