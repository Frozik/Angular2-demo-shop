export function getElementOffset(element: HTMLElement): {
    left: number,
    top: number,
    width: number,
    height: number,
} {
    if (!element) {
        return null;
    }

    const { offsetWidth: width, offsetHeight: height } = element;
    let { offsetTop: top, offsetLeft: left } = element;

    for (let offsetParent: any = element.offsetParent; !!offsetParent; offsetParent = offsetParent.offsetParent) {
        top += offsetParent.offsetTop;
        left += offsetParent.offsetLeft;
    }

    return { left, top, width, height };
}
