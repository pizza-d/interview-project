import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../shared/service/modal.service';
import { minMaxLengthValid, requiredValid } from '../../shared/component/input/validator';
import { ApiService } from '../../api/api.service';
import { NavigatorService } from '../../shared/service/navigator.service';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formGroup: FormGroup;

  show: boolean = false;

  get accountControl() {
    return this.formGroup.controls['account'];
  }

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private apiService: ApiService,
    private route: NavigatorService
  ) {
    this.formGroup = this.fb.group({
      account: ['', [requiredValid()]],
      username: ['', [minMaxLengthValid(6,20)]],
      password: ['', [minMaxLengthValid(8,12)]]
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.modalService.open({});
    this.firstConfirm();
  }

  switchType(): void {
    this.show = !this.show;
  }

  async firstConfirm() {
    const confirm = await this.modalService.openConfirm({
      title: '全面提升帳戶的使用安全',
      content: '自108年5月你，登入需輸入【使用者名稱】，請立即前往設定。若您已經設定過，可關閉並略過此提醒。',
    });

    if (confirm) {
      this.goSetUserName();
    } else {
    }
  }

  openAcconutInfo(): void {
    this.modalService.openAlert({
      content: '帳號為您的身分證字號。倘為外籍人士，請填寫投保時於要保書上填寫支號碼，例如：護照號碼／居留證號碼／當地的身分證字號...等',
    });
  }

  openUserInfo(): void {
    this.modalService.openAlert({
      title: '全面提升帳戶的使用安全',
      content: '自108年5月你，登入安聯e網通需輸入【使用者名稱】，若您尚未設定，請至會員登入頁點選【我要設定使用者名稱】進行設定',
    });
  }

  async btnLogin(): Promise<void> {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      console.log('Form Error');
    } else {
      try{
        const res = await this.apiService.sendApi({apiId: 'Login_19_2'}).toPromise();
        console.log('POST Success:', res);
      } catch (error) {

      }
    }
  }

  // 設定使用者名稱頁面
  goSetUserName(): void {
    this.route.push('set-username');
  }
}
