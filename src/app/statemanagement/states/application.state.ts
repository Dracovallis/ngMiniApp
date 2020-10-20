import { ScreenState } from './screen.state';

export type ApplicationState = Readonly<{
    screen: ScreenState;
}>;
