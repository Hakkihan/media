import classNames from 'classnames';

function Skeleton({times, className}) {
    const outerClassNames = classNames(
        'relative',
        'overflow-hidden', //allows us to hide the inner element if it is not overlapping
        'bg-gray-200',
        'rounded', //rounded corners
        'mb-2.5', //some margin on the bottom
        className
    );

    const innerClassNames = classNames(
        'animate-shimmer', //applies the "animation" of shimmer
        'absolute',
        'inset-0', //makes it expand to fill the parent outer div
        'bg-gradient-to-r', //gradient towards r.h.s
        'from-gray-200',
        'via-white',
        'to-gray-200',
        '-translate-x-full' //the dash '-' at the front means a negative translating direction. so effectively, this results in placing
                                //the inner div all the way on the left side
    );
    // const boxes= [];
    // for(let i =0; i< times; i++){
    //     boxes.push(<div key={i}></div>);
    // }
    // return boxes;

    //the code below is equaivalent to the code above
    const boxes = Array(times).fill(0).map((_, i) =>{
        return <div key={i} className={outerClassNames}>
                    <div className = {innerClassNames}></div>
                </div>;
    });
    return boxes;

}

export default Skeleton;