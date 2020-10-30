<h1>expense-tracker</h1>
This application simply helps you to keep the record of your expenses

<h2>Features</h2>
<h4>1. Authenticating User (Login / Logout / Registering)</h4>
<li>When a new user visits the website. he/she should be given option to register themselves.</li>
<li>If user already exists in the database. He/She should be given option to login</li>
<li>A proper logout functionality</li>
<li>Authentication must be done using <strong>JWT</strong> in the backend</li>
<li>email should be used as the unique identification for the user. i.e. user should be able to login/register using email only.</li>
<h4>2. Manage Profile</h4>
<li>User should be given option to view his/her profile</li>
<li>User should be given option update his/her profile (except for email)
    <ul></ul>
    <li>For password, user needs to confirm the current password. then only he/she can update the password.</li>
</li>
<h4>3. View Expenses</h4>
<li>User should be able to see all his/her expenses in monthly order.</li>
<li>proper detailed data should be displayed to the user in a fine tabular design</li>
<li>Monthly total expenses and earnings should also be displayed with proper highlights</li>
<li>there should be categorised (<i>expenses like food/gaming/fuel/etc...</i>) data for expenses displayed in beautiful manner. it should be also monthly.</li>
<li>A grand total of all till date should also be displayed</li>
<h4>4. Add Expenses</h4>
<li>User must be able to add the expense. there must be following options while adding
    <ul>
        <li>category(food/gaming/study/etc...) <small>this must be decided and kept statically</small></li>
        <li>debited / credited</li>
        <li>description of the transaction</li>
        <li>date (current by default)</li>
        <li>due date (optional. if user needs to return the amount / take the amount)
            </br>
            </br>
            if <strong>credited</strong>: give option of <b>return to</b>
            if <strong>debited</strong>: give option of <b>recieve from</b>
        </li>
    </ul>
</li>
<h4>5. delete expense</h4>
<li>this must be a <strong>soft delete</strong></li>
<h4>6. update expense</h4>
<li>update the description/date/due-date/amount ony. Option of Credited/Debited <i>should not be able to update</i></li>
<h2>Priorities</h2>
<ul>
    <li>Top Priority: 4,5,6<li>
    <li>Medium Priority: 3<li>
    <li>Low Priority: 1,2<li>
</ul>