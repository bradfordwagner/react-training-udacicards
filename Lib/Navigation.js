// @flow

// should be tagged on props.navigation
export type NavigationProps<P> = {
    navigate(state: string, args?: any): void,
    state: { params: P }
}