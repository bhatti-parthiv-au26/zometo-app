import data from "../../../backend/data";
import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const SinginScreen = {
    after_render: () => {
        document.
        getElementById("signin-form").
        addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await signin({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
                return;
            } else {
                setUserInfo(data);
                redirectUser();
            }
        });
    },
            
    render: async () => {
        if (getUserInfo().name) {
            redirectUser();
        }
         return `
        <div class="form-container">
            <form id="signin-form">
                <ul class = "form-items">
                    <li>
                        <h1>Sign-In</h1>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </li>   
                    <li>
                        <button type="submit" class="primary">SignIn</button>
                    </li>  
                    <li> 
                    <div>
                        new User?
                        <a href="/#/register">creat your account </a>
                    </div>
                    </li>
                </ul>
            </form>
        </div>
        `;
    },
};


export default SinginScreen;
