const navItems = document.querySelectorAll('.navItem');

for(let i = 0; i < navItems.length; i++) {
    navItems[i].querySelector('.navHeader').addEventListener('click', e => {
        console.log(e);
        let parent = e.target.parentNode;

        while(!parent.classList.contains('navItem')) {
            parent = parent.parentNode;
        }
        console.log(parent.querySelector('.navBody'));
        parent.classList.toggle('active');
        if(parent.querySelector('.navBody').style.height == '') {
            parent.querySelector('.navBody').style.height = `${parent.querySelector('.navBody').scrollHeight}px`;
        }
        else if(parent.querySelector('.navBody').style.height != '') {
            parent.querySelector('.navBody').style.height = '';
        }
    }, true);
}