import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    AccordionModule,
    MatExpansionModule,
    BadgeModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  toggleFlag: boolean = true;
  panelOpenState = false;
  sideNavData: any[] = [];
  resizeObserver!: ResizeObserver;

  @ViewChild('mainContainer') mainContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('topHeaderContainer') topHeaderContainer!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    this.sideNavData = [
      { options: ['Dashboard', 'Attendance', 'Apply For Leaves', 'Option 4'], navIcon: 'pi pi-objects-column', navName: 'Home' },
      { options: [], navIcon: 'pi pi-address-book', navName: 'Appointments' },
      { options: ["Today's Schedule"], navIcon: 'pi pi-calendar-plus', navName: 'Reminder' },
      { options: ['Financial Report'], navIcon: 'pi pi-chart-line', navName: 'Reports' },
      { options: ['Print Receipts', 'Receipt Settings'], navIcon: 'pi pi-receipt', navName: 'Receipts' },
      { options: ['Employee Profile', 'Admin Controls', 'User Access Controls'], navIcon: 'pi pi-spin pi-cog', navName: 'Settings' },
      { options: ['Customer Care', 'Developer Support'], navIcon: 'pi pi-phone', navName: 'Contact' },
      { options: [], navIcon: 'pi pi-sign-out', navName: 'Logout' },
    ];
  }

  ngAfterViewInit() {
    this.adjustMainContainerHeight();
    this.setupResizeObserver();
  }

  adjustMainContainerHeight() {
    if (typeof window !== 'undefined') {
      const windowHeight = window.innerHeight;
      const remainingHeightInVH = ((windowHeight - 0) / windowHeight) * 100;
      this.mainContainer.nativeElement.style.height = `${remainingHeightInVH}vh`;
    }
  }

  setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.adjustMainContainerHeight();
      });
      this.resizeObserver.observe(document.body);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  onToggle() {
    this.toggleFlag = !this.toggleFlag;
    const mainContainerElement = this.mainContainer.nativeElement;

    if (mainContainerElement) {
      mainContainerElement.style.gridTemplateColumns = !this.toggleFlag
        ? '1fr'
        : '250px auto';
    }
  }
}
