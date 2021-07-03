const currentPhotoPresented = document.querySelector('.photo')
const containerWithImages = document.querySelector('.container')

let selectedImage;

containerWithImages.addEventListener("click", function(event) {
    let target = event.target;

    if (target.parentNode.classList.contains('image') === false) { return; };

    highlightAndZoom(target)
});


function highlightAndZoom(image) {
    if (selectedImage) {
        selectedImage.classList.remove('active-image');
    }
    selectedImage = image.parentNode;
    selectedImage.classList.add('active-image');
    currentPhotoPresented.children[0].setAttribute('src', image.getAttribute('src'))
}
