const carouselData = [
    {
        title: 'Slide 1',
        description: 'Description for Slide 1',
        image: 'path/to/image1.jpg',
    },
    {
        title: 'Slide 2',
        description: 'Description for Slide 2',
        image: 'path/to/image2.jpg',
    },
    {
        title: 'Slide 3',
        description: 'Description for Slide 3',
        image: 'path/to/image3.jpg',
    },
    // Add more slides as needed
];

document.addEventListener('DOMContentLoaded', () => {
    const carouselTemplate = Handlebars.compile(document.querySelector('#carousel-template').innerHTML);
    const carouselContainer = document.querySelector('.carousel');
    
    carouselData.forEach(slide => {
        const slideHTML = carouselTemplate(slide);
        carouselContainer.innerHTML += slideHTML;
    });
});
