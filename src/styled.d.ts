import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        btnColor: string;
        btnAccentColor:string;
        accentColor: string;
    }
}