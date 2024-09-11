const btnNavbar = document.getElementById("btnNavbar");
const mobileNavbar = document.getElementById("mobile-menu");

btnNavbar.addEventListener("click", () => {
  mobileNavbar.classList.toggle("hidden");
});

const closeNavbar = document.querySelectorAll(".closeNavbar");

for (let i = 0; i < closeNavbar.length; i++) {
  closeNavbar[i].addEventListener("click", () => {
    setTimeout(() => {
      mobileNavbar.classList.toggle("hidden");
    }, 1000);
  });
}

const memberCardsContainer = document.getElementById("memberCards");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const backBtn = document.getElementById("backButton");

fetch("../data/members.json")
  .then((response) => response.json())
  .then((data) => {
    members = data;
    displayMembers(members);
  })
  .catch((error) => console.error("Error fetching members:", error));

function createMemberCard(member) {
  return `
  <div class="group">
    <img alt="${member.name}" src="${member.image}" class="h-56 w-full rounded-xl object-cover shadow-xl transition md:grayscale-[50%] hover:grayscale-[0]" />
    <div class="p-4">
      <a href="#">
        <h3 class="text-lg font-semibold text-gray-900">${member.name}</h3>
      </a>
      <p class="mt-2 text-sm/relaxed text-gray-500">${member.description}</p>
    </div>
  </div>
  `;
}

function displayMembers(members) {
  let memberCardsHTML = "";
  members.forEach((member) => {
    memberCardsHTML += createMemberCard(member);
  });
  memberCardsContainer.innerHTML = memberCardsHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  backBtn.style.display = "none";
});

function searchMembers(event) {
  event.preventDefault();

  const searchTerm = searchInput.value.toLowerCase();
  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchTerm));
  displayMembers(filteredMembers);

  backBtn.style.display = "block";
}

searchForm.addEventListener("submit", searchMembers);

backBtn.addEventListener("click", function (event) {
  event.preventDefault();
  displayMembers(members);
  this.style.display = "none";
});
