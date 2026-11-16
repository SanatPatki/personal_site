(function () {
    var quotes = [
        ['The best way out is always through.', 'Robert Frost'],
        ['It always seems impossible until it’s done.', 'Nelson Mandela'],
        ['We are what we repeatedly do. Excellence, then, is not an act, but a habit.', 'Will Durant'],
        ['Stay hungry, stay foolish.', 'Steve Jobs'],
        ['The obstacle is the way.', 'Marcus Aurelius'],
        ['What we think, we become.', 'Buddha'],
        ['Simplicity is the ultimate sophistication.', 'Leonardo da Vinci'],
        ['The secret of getting ahead is getting started.', 'Mark Twain'],
        ['Fall seven times, stand up eight.', 'Japanese proverb'],
        ['Do what you can, with what you have, where you are.', 'Theodore Roosevelt'],
        ['The only way to do great work is to love what you do.', 'Steve Jobs'],
        ['Imagination is more important than knowledge.', 'Albert Einstein'],
        ['A ship in harbor is safe, but that is not what ships are built for.', 'John A. Shedd'],
        ['He who has a why to live can bear almost any how.', 'Friedrich Nietzsche'],
        ['Well done is better than well said.', 'Benjamin Franklin']
    ];

    var el = document.querySelector('.footer-motto');
    if (!el) return;

    var i = Math.floor(Math.random() * quotes.length);

    function render() {
        el.textContent = '“' + quotes[i][0] + '” — ' + quotes[i][1];
    }

    render();

    setInterval(function () {
        el.style.opacity = '0';
        setTimeout(function () {
            i = (i + 1) % quotes.length;
            render();
            el.style.opacity = '';
        }, 600);
    }, 8000);
})();
