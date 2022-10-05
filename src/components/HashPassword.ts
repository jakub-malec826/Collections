import { sha256 } from "js-sha256";

export default function HashPassword(password: string) {
    const hash = sha256.create();
    hash.update(password);
    hash.hex();
    return hash.toString();
}
